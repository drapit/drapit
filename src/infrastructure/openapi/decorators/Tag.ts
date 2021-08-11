import "reflect-metadata";
import { TagDefinition } from "./Definitions";

/**
 * Tag decorator to group endpoints under the controller tag.
 *
 * @param {string} name
 * @param {string} [description]
 * @return {*}  {ClassDecorator}
 */
const Tag = (name: string, description?: string): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    if (!Reflect.hasMetadata("tags", target)) {
      Reflect.defineMetadata("tags", [], target);
    }

    const tags: TagDefinition[] = Reflect.getMetadata("tags", target) || [];

    Reflect.defineMetadata('tags', [...tags, { name, description }], target);
  }
}

export default Tag;
