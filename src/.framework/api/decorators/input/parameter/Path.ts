import { HttpInput } from ".framework/api/enums";
import Parameter from "./Parameter";

const Path = Parameter(HttpInput.path, "number");

export default Path;
