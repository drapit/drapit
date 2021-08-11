import MIMETypes from "application/enums/MIMETypes";
import Action from "./Action";

const Json = (): MethodDecorator => Action({ contentTypes: [MIMETypes.json]});

export default Json;
