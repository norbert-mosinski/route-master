import { HttpMethod } from "../enums/http-method";
import {RequestInterceptor} from "./request-interceptor";
import {ResponseInterceptor} from "./response-interceptor";
import { RouteDefinerBag } from "./route-definer-bag";

export interface BaseRouteDefinition {
    path: string;
    params?: Record<string, unknown>;
    method?: HttpMethod;
    interceptors?: {
        request?: RequestInterceptor[];
        response?: ResponseInterceptor[];
    };
    children?: RouteDefinerBag<BaseRouteDefinition>;
}

export type RouteDefinition<ExtendedRouteDefinition extends {} = BaseRouteDefinition> = BaseRouteDefinition & ExtendedRouteDefinition;
