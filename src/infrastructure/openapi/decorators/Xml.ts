import MIMETypes from "application/enums/MIMETypes";
import Route from "./Route";

const Xml = (): MethodDecorator => Route({ contentTypes: [MIMETypes.xml]});

export default Xml;
