import Route from "./Route";

const Post = (path: string): MethodDecorator =>
  Route({ path, requestMethod: "post" });

export default Post;
