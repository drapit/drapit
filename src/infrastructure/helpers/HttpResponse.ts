// TODO: Move this file to application/ directory
// TODO: Think about returning xml, streams and files
// TODO: Unit test this

/*
 * This class contains helper methods to build http response objects.
 * Most common http status responses comes built-in,
 * feel free to implement any other response you need.
 */
export default class HttpResponse<T = null> {
  public readonly status: number;
  public readonly message?: string | null;
  public readonly data?: T;
  public readonly error?: string | null;
  public readonly success: boolean;

  // 2xx
  public static ok<T>(data?: T, message?: string): HttpResponse<T> {
    return new HttpResponse(200, data, message);
  }
  public static created<T>(data?: T, message?: string): HttpResponse<T> {
    return new HttpResponse(201, data, message);
  }
  public static accepted(message?: string): HttpResponse<null> {
    return new HttpResponse(202, null, message);
  }
  public static noContent(): HttpResponse<null> {
    return new HttpResponse(204);
  }

  // 4xx
  public static badRequest(error: string): HttpResponse<null> {
    return new HttpResponse(400, null, null, error);
  }
  public static unauthorized(error: string): HttpResponse<null> {
    return new HttpResponse(401, null, null, error);
  }
  public static forbidden(error: string): HttpResponse<null> {
    return new HttpResponse(403, null, null, error);
  }
  public static notFound(error: string): HttpResponse<null> {
    return new HttpResponse(404, null, null, error);
  }
  public static notAcceptable(error: string): HttpResponse<null> {
    return new HttpResponse(406, null, null, error);
  }
  public static conflict(error: string): HttpResponse<null> {
    return new HttpResponse(409, null, null, error);
  }
  public static unprocessable(error: string): HttpResponse<null> {
    return new HttpResponse(422, null, null, error);
  }

  //5xx
  public static internalError(error: string): HttpResponse<null> {
    return new HttpResponse(500, null, error);
  }

  private constructor(
    status: number,
    data?: T,
    message?: string | null,
    error?: string | null
  ) {
      this.status = status;
      this.message = message || undefined;
      this.data = data || undefined;
      this.error = error || undefined;
      this.success = status >= 200 && status < 400;
  }
}
