// TODO: Move this file to api/ directory
// TODO: Think about returning xml, streams and files
// TODO: Unit test this

/**
 * Wrapper for the responses.
 * This class contains helper methods to build http response objects.
 * Most common http status responses comes built-in,
 * feel free to implement any other response you need.
 *
 * @export
 * @class HttpResponse
 * @template T
 */
export default class HttpResponse<T = null> {
  /**
   * Http status code.
   *
   * @type {number}
   * @memberof HttpResponse
   */
  public readonly status: number; // TODO: enum for this.

  /**
   * Message when request succeeds
   *
   * @type {(string | null)}
   * @memberof HttpResponse
   */
  public readonly message?: string | null;

  /**
   * Response content.
   *
   * @type {T}
   * @memberof HttpResponse
   */
  public readonly data?: T;

  /**
   * Message when request fails.
   *
   * @type {(string | null)}
   * @memberof HttpResponse
   */
  public readonly error?: string | null;

  /**
   * Indicates whether the request was successful or not.
   *
   * @type {boolean}
   * @memberof HttpResponse
   */
  public readonly success: boolean;

  /**
   * Creates an instance of HttpResponse.
   * @param {number} status
   * @param {T} [data]
   * @param {(string | null)} [message]
   * @param {(string | null)} [error]
   * @memberof HttpResponse
   */
   public constructor(
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

  // 2xx ================================================================

  /**
   * Responds with 200 status
   *
   * @static
   * @template T
   * @param {T} [data]
   * @param {string} [message]
   * @return {*}  {HttpResponse<T>}
   * @memberof HttpResponse
   */
  public static ok<T>(data?: T, message?: string): HttpResponse<T> {
    return new HttpResponse(200, data, message);
  }

  /**
   * Responds with 201 status
   *
   * @static
   * @template T
   * @param {T} [data]
   * @param {string} [message]
   * @return {*}  {HttpResponse<T>}
   * @memberof HttpResponse
   */
  public static created<T>(data?: T, message?: string): HttpResponse<T> {
    return new HttpResponse(201, data, message);
  }

  /**
   * Responds with 202 status
   *
   * @static
   * @param {string} [message]
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static accepted(message?: string): HttpResponse<null> {
    return new HttpResponse(202, null, message);
  }
  
  /**
   * Responds with 204 status
   *
   * @static
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static noContent(): HttpResponse<null> {
    return new HttpResponse(204);
  }

  // 4xx ================================================================

  /**
   * Responds with 400 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static badRequest(error: string): HttpResponse<null> {
    return new HttpResponse(400, null, null, error);
  }

  /**
   * Responds with 401 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static unauthorized(error: string): HttpResponse<null> {
    return new HttpResponse(401, null, null, error);
  }

  /**
   *Responds with 403 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static forbidden(error: string): HttpResponse<null> {
    return new HttpResponse(403, null, null, error);
  }

  /**
   * Responds with 404 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static notFound(error: string): HttpResponse<null> {
    return new HttpResponse(404, null, null, error);
  }

  /**
   * Responds with 406 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static notAcceptable(error: string): HttpResponse<null> {
    return new HttpResponse(406, null, null, error);
  }

  /**
   * Responds with 409 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static conflict(error: string): HttpResponse<null> {
    return new HttpResponse(409, null, null, error);
  }

  /**
   * Responds with 422 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static unprocessable(error: string): HttpResponse<null> {
    return new HttpResponse(422, null, null, error);
  }

  //5xx =================================================================

  /**
   * Responds with 500 status
   *
   * @static
   * @param {string} error
   * @return {*}  {HttpResponse<null>}
   * @memberof HttpResponse
   */
  public static internalError(error: string): HttpResponse<null> {
    return new HttpResponse(500, null, error);
  }
}
