import { Router, Request, Response } from "express";
import HttpResponse from "infrastructure/helpers/HttpResponse";

// TODO: declare types for params and user
type ControllerAction = (
  params: unknown,
  // user: unknown
) => Promise<HttpResponse<unknown>>;

const handler = (action: ControllerAction) => async (req: Request, res: Response) => {
  try {
    const params = { ...req.query, ...req.body };
    const response = await action(params /*, req.User */);

    return res.status(response.status).json(response);
  } catch (e) {
    const response = HttpResponse.internalError(e.message);

    return res.status(response.status).json(response);
  }
};

export default abstract class APIRouter {
  protected path: string;
  private router: Router;

  protected constructor(path: string, router: Router) {
    this.path = path;
    this.router = Router();
    this.route();

    router.use(this.path, this.router);
  }

  protected abstract route(): void;

  protected get(path: string, action: ControllerAction): void {
    this.router.get(this.sanitize(path), handler(action));
  }

  protected post(path: string, action: ControllerAction): void {
    this.router.post(this.sanitize(path), handler(action));
  }

  protected patch(path: string, action: ControllerAction): void {
    this.router.patch(this.sanitize(path), handler(action));
  }

  protected put(path: string, action: ControllerAction): void {
    this.router.put(this.sanitize(path), handler(action));
  }

  protected delete(path: string, action: ControllerAction): void {
    this.router.delete(this.sanitize(path), handler(action));
  }

  private sanitize(path: string) {
    path = this.addBeginningSlash(path);
    path = this.removeTrailingSlash(path);

    return path;
  }

  private removeTrailingSlash(value: string): string {
    if (value.lastIndexOf("/") === value.length - 1) {
      return value.substring(0, value.length - 1);
    }

    return value;
  }

  private addBeginningSlash(value: string): string {
    if (value[0] === '/') {
      return `/${value}`;
    }

    return value;
  }
}
