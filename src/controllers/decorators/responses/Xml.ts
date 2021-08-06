import Route from "../routes/Route";

const Xml = (): MethodDecorator => Route({ contentTypes: ['application/xml']});

export default Xml;
