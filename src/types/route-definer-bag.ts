import { RouteDefiner } from "./route-definer";

export interface RouteDefinerBag<ExtendedRouteDefinition extends {} = {}>
{
    [key: string]: RouteDefiner<ExtendedRouteDefinition>;
}