import Route from "./Route";

const Post = (path: string): MethodDecorator => Route(path, 'post');

export default Post;
