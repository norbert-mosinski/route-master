import { Response } from "./response";

export interface ResponseInterceptor {
  <ConcreteResponse extends Response = Response>(response: ConcreteResponse): ConcreteResponse;
}
