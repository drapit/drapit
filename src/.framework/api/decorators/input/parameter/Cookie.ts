import { HttpInput } from ".framework/api/enums";
import Parameter from "./Parameter";

const Cookie = Parameter(HttpInput.cookie, "string");

export default Cookie;
