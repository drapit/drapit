import MIMETypes from "application/enums/MIMETypes";
import Route from "./Route";

const Json = (): MethodDecorator => Route({ contentTypes: [MIMETypes.json]});

export default Json;
