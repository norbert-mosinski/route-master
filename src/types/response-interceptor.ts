import { InterceptorInjectionParams } from "./interceptor-injection-params";
import { Response } from "./response";

export interface ResponseInterceptor {
  <ConcreteResponse extends Response = Response, InjectionParams extends InterceptorInjectionParams = InterceptorInjectionParams>(response: ConcreteResponse, injectionParams: InjectionParams): ConcreteResponse;
}
