import HttpResponse from "infrastructure/helpers/HttpResponse";


// TODO: declare types for params and user
type ControllerAction = (
  ...params: unknown[]
  // user: unknown
) => Promise<HttpResponse<unknown>>;

export default ControllerAction
