import { RequestConfig } from "./request-config";

interface RequestInterceptorFunction {
  <Config extends RequestConfig>(requestConfig: Config): Config;
}

export type RequestInterceptor = RequestInterceptorFunction | (unknown & { interceptor: RequestInterceptorFunction });
