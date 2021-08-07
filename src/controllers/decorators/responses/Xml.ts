import MIMETypes from "application/enums/MIMETypes";
import Route from "../routes/Route";

const Xml = (): MethodDecorator => Route({ contentTypes: [MIMETypes.xml]});

export default Xml;
