export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequrest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
