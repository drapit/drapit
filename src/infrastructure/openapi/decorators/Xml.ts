import MIMETypes from "application/enums/MIMETypes";
import Action from "./Action";

const Xml = (): MethodDecorator => Action({ contentTypes: [MIMETypes.xml]});

export default Xml;
