import { InterceptorInjectionParams } from "./interceptor-injection-params";
import { RequestConfig } from "./request-config";

export interface RequestInterceptor {
  <ConcreteConfig extends RequestConfig = RequestConfig, InjectionParams extends InterceptorInjectionParams = InterceptorInjectionParams>(requestConfig: ConcreteConfig, injectionParams: InjectionParams): ConcreteConfig;
}
