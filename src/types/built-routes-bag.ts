import { AxiosAdapter } from '../adapters/axios-adapter';
import { HttpMethod } from '../enums/http-method';
import { RouteManager } from '../managers/route-manager';
import { Client } from './client';
import { RouteDefinerBag } from './route-definer-bag';

type ChildrenRouteDefinerBag<ExactRouteDefinerBag extends RouteDefinerBag, Key extends keyof ExactRouteDefinerBag> = ReturnType<ExactRouteDefinerBag[Key]>['children'];

export type BuiltRoutesBag<ExactRouteDefinerBag extends RouteDefinerBag, ConcreteClient extends Client<unknown, unknown>> = {
    [key in keyof ExactRouteDefinerBag]: (
      ...params: Parameters<ExactRouteDefinerBag[key]>
    ) => BuiltRoutesBag<ChildrenRouteDefinerBag<ExactRouteDefinerBag, key> extends {} ? ChildrenRouteDefinerBag<ExactRouteDefinerBag, key> : {}, ConcreteClient> &
      ReturnType<ExactRouteDefinerBag[key]> &
      Omit<RouteManager<ConcreteClient>, ReturnType<ExactRouteDefinerBag[key]>['method'] extends string ? '' : 'request'>;
  };