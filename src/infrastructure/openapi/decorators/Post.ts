import { HttpMethods } from "./Definitions";
import Route from "./Route";

const Post = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.post });

export default Post;
