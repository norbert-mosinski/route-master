import { HttpMethod } from "../enums/http-method";
import { RouteDefinition } from "./route-definition";

export interface RequestConfig
{
    url: string, method: HttpMethod, data?: Record<string, unknown> | undefined, definition: RouteDefinition;
}