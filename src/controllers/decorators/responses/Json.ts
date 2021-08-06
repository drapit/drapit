import Route from "../routes/Route";

const Json = (): MethodDecorator => Route({ contentTypes: ['application/json']});

export default Json;
