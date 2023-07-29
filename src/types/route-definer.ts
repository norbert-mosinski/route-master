import { RouteDefinition } from './route-definition';

export interface RouteDefiner<ExtendedRouteDefinition extends {} = {}> {
  (...params: any[]): RouteDefinition<ExtendedRouteDefinition>;
}
