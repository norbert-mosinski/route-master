import { Response } from './response';

interface ResponseInterceptorFunction {
  <ConcreteResponse extends Response>(response: ConcreteResponse): ConcreteResponse;
}

export type ResponseInterceptor = ResponseInterceptorFunction | (unknown & { interceptor: ResponseInterceptorFunction });
