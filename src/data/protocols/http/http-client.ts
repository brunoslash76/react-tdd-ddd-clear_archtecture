export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequrest = 400,
  unauthorized = 401,
  forbiden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  headers?: any
  body?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
