import "reflect-metadata";
import { TagDefinition } from "./Definitions";

const Tag = (name: string, description?: string): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    if (!Reflect.hasMetadata("tags", target)) {
      Reflect.defineMetadata("tags", [], target);
    }

    const tags: TagDefinition[] = Reflect.getMetadata("tags", target) || [];

    Reflect.defineMetadata('tags', [...tags, { name, description }], target);
  }
}

export default Tag;
