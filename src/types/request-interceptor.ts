import { RequestConfig } from "./request-config";

export interface RequestInterceptor {
  <ConcreteConfig extends RequestConfig = RequestConfig>(requestConfig: ConcreteConfig): ConcreteConfig;
}
