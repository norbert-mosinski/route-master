import { RouteDefinition } from '../types/route-definition';
import { RouteDefinerBag } from '../types/route-definer-bag';
import { RouteDefiner } from '../types/route-definer';
import { BuiltRoutesBag } from '../types/built-routes-bag';
import { RouteManager } from '../managers/route-manager';
import { Client } from '../types/client';

export class RouteBuildService
{
    buildRoutes = <ExactRouteDefinerBag extends RouteDefinerBag, ConcreteClient extends Client<unknown, unknown>>(routeDefinerBag: ExactRouteDefinerBag, client: ConcreteClient): BuiltRoutesBag<typeof routeDefinerBag, ConcreteClient> => {
        return this.innerBuildRoutes(routeDefinerBag, [], client);
    }

    private innerBuildRoutes = <ExactRouteDefinerBag extends RouteDefinerBag, ConcreteClient extends Client<unknown, unknown>>(routeDefinerBag: ExactRouteDefinerBag, routeDefinitions: RouteDefinition[], client: ConcreteClient): BuiltRoutesBag<typeof routeDefinerBag, ConcreteClient> => {
        const route = (routeDefiner: RouteDefiner) => (...params: Parameters<typeof routeDefiner>) => {
            const routeDefinition = routeDefiner(...params);

            return this.innerBuildRoutes(routeDefinition.children ?? {}, [...routeDefinitions, routeDefinition], client);
        }

        const routes = Object
        .entries(routeDefinerBag)
        .reduce((builder, [key, routeDefiner]) => ({...builder, [key]: route(routeDefiner)}), {});

        // @ts-ignore
        return {...routes, ...(new RouteManager(routeDefinitions, client))};
    }
}