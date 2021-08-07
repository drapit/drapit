import MIMETypes from "application/enums/MIMETypes";
import Route from "../routes/Route";

const Json = (): MethodDecorator => Route({ contentTypes: [MIMETypes.json]});

export default Json;
