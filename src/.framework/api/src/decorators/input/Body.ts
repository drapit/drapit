import { BodyDefinition, Constructor, PropertyDefinition, RouteDefinition } from ".framework/api/definitions";
import { DTO, SimpleFile } from ".framework/api/dto";
import { MIMETypes } from ".framework/api/enums";
import { Stream } from "stream";

type BodyTypes = String | DTO | SimpleFile | Stream;

const Body = <T extends BodyTypes>(
  BodyType: Constructor<T>,
  description?: string
): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const BT = BodyType;
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }
    // define metadata
    if (!Reflect.hasMetadata("properties", BT)) {
      Reflect.defineMetadata("properties", [], BT);
    }
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      BT
    );

    const sample = new BT();

    let mimeType;
    if (Reflect.hasMetadata("accepts", BT)) {
      mimeType = Reflect.getMetadata("accepts", BT);
    }else {
      if (sample instanceof DTO) mimeType = MIMETypes.json;
      else if (sample instanceof SimpleFile) mimeType = MIMETypes.formData;
      else if (sample instanceof Stream) mimeType = MIMETypes.stream;
      else mimeType = MIMETypes.text;
    }

    // Optimization
    const propertyMap = properties.toDictionary("name");

    const body: BodyDefinition = {
      position: parameterIndex,
      ParameterType: BT,
      description,
      mimeType,
      properties: Object.keys(new BodyType())
        .map((key): PropertyDefinition => ({
          ...propertyMap.get(key),
          type: propertyMap.get(key)?.type || "string",
        }) as PropertyDefinition),
    };

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor
    ) as Array<RouteDefinition>;

    const index = routes.findIndex((route) => route.name === propertyKey);

    if (index != -1) {
      routes[index].body = body;
    } else {
      routes.push({
        body,
        name: propertyKey.toString(),
      });
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export default Body;
