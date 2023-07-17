import { RouteDefinition } from '../types/route-definition';
import { RouteDefinerBag } from '../types/route-definer-bag';
import { RouteDefiner } from '../types/route-definer';
import { BuiltRoutesBag } from '../types/built-routes-bag';
import { RouteManager } from '../managers/route-manager';
import { Client } from '../types/client';
import { InterceptorInjectionParams } from '../types/interceptor-injection-params';

export class RouteBuildService
{
    buildRoutes = <ExactRouteDefinerBag extends RouteDefinerBag, ConcreteClient extends Client<unknown>>(routeDefinerBag: ExactRouteDefinerBag, client: ConcreteClient, interceptorInjectionParams: InterceptorInjectionParams = {}): BuiltRoutesBag<typeof routeDefinerBag, ConcreteClient> => {
        return this.innerBuildRoutes(routeDefinerBag, [], client, interceptorInjectionParams);
    }

    private innerBuildRoutes = <ExactRouteDefinerBag extends RouteDefinerBag, ConcreteClient extends Client<unknown>>(routeDefinerBag: ExactRouteDefinerBag, routeDefinitions: RouteDefinition[], client: ConcreteClient, interceptorInjectionParams: InterceptorInjectionParams): BuiltRoutesBag<typeof routeDefinerBag, ConcreteClient> => {
        const route = (routeDefiner: RouteDefiner) => (...params: Parameters<typeof routeDefiner>) => {
            const routeDefinition = routeDefiner(...params);

            return this.innerBuildRoutes(routeDefinition.children ?? {}, [...routeDefinitions, routeDefinition], client, interceptorInjectionParams);
        }

        const routes = Object
        .entries(routeDefinerBag)
        .reduce((builder, [key, routeDefiner]) => ({...builder, [key]: route(routeDefiner)}), {});

        // @ts-ignore
        return {...routes, ...(new RouteManager(routeDefinitions, client, interceptorInjectionParams))};
    }
}