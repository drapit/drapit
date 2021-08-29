import { HttpInput } from ".framework/api/enums";
import Parameter from "./Parameter";

const Query = Parameter(HttpInput.query, "string");

export default Query;
