export type HttpRequest = {
  url: string;
  method: HttpMethod;
  params?: any;
};

export interface HttpClient {
  request: <R = any>(data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export type HttpErrorResponse = {
  detail: string;
  error: {
    name: string;
    statusCode: number;
  };
};

export declare type HttpErrorResponsePreValidation = {
  statusCode: number;
  message: string;
  description?: any;
};
