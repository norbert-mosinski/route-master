import { InterceptorInjectionParams } from "./interceptor-injection-params";
import { Response } from "./response";

export interface ResponseInterceptor {
  <ConcreteResponse extends Response, InjectionParams extends InterceptorInjectionParams>(response: ConcreteResponse, injectionParams: InjectionParams): ConcreteResponse;
}
