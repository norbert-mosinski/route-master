import { InterceptorInjectionParams } from "./interceptor-injection-params";
import { RequestConfig } from "./request-config";

export interface RequestInterceptor {
  <ConcreteConfig extends RequestConfig, InjectionParams extends InterceptorInjectionParams>(requestConfig: ConcreteConfig, injectionParams: InjectionParams): ConcreteConfig;
}
