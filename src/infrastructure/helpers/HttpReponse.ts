// TODO: Think about returning streams and files
// TODO: Unit test this

/*
 * This is the wrapper of the response the client is going to receive.
 * Feel free to add any other the suits your needs.
 */
type ResponseObject = {
  status: number;
  message?: string | null;
  data?: unknown;
  error?: string | null;
  success: boolean;
};

/*
 * This class contains helper methods to build http response objects.
 * Most common http status responses comes built-in,
 * feel free to implement any other response you need.
 */
export default class HttpResponse {
  // 2xx
  public static ok<T>(data?: T, message?: string): ResponseObject {
    return this.respond(200, data, message);
  }
  public static created<T>(data?: T, message?: string): ResponseObject {
    return this.respond(201, data, message);
  }
  public static accepted(message?: string): ResponseObject {
    return this.respond(202, null, message);
  }
  public static noContent(): ResponseObject {
    return this.respond(204);
  }

  // 4xx
  public static badRequest(error: string): ResponseObject {
    return this.respond(400, null, null, error);
  }
  public static unauthorized(error: string): ResponseObject {
    return this.respond(401, null, null, error);
  }
  public static forbidden(error: string): ResponseObject {
    return this.respond(403, null, null, error);
  }
  public static notFound(error: string): ResponseObject {
    return this.respond(404, null, null, error);
  }
  public static notAcceptable(error: string): ResponseObject {
    return this.respond(406, null, null, error);
  }
  public static conflict(error: string): ResponseObject {
    return this.respond(409, null, null, error);
  }
  public static unprocessable(error: string): ResponseObject {
    return this.respond(422, null, null, error);
  }

  //5xx
  public static internalError(error: string): ResponseObject {
    return this.respond(500, null, error);
  }

  private static respond<T>(
    status: number,
    data?: T,
    message?: string | null,
    error?: string | null
  ): ResponseObject {
    return {
      status,
      message,
      data,
      error,
      success: status >= 200 && status < 400,
    };
  }
}
