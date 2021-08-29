import { HttpInput } from ".framework/api/enums";
import Parameter from "./Parameter";

const Header = Parameter(HttpInput.header, "string");

export default Header;
