import { AutoAssignable } from ".framework/api/decorators";
import DTO from "./DTO";

@AutoAssignable
export default class SimpleFile extends DTO {
  public readonly name: string;
  public readonly data: Buffer;
  public readonly size: number;
  public readonly encoding: string;
  public readonly mimetype: string;
  public readonly md5: string;
}
