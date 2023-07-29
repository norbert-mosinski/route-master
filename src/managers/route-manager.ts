import { HttpMethod } from '../enums/http-method';
import { Client } from '../types/client';
import { RequestConfig } from '../types/request-config';
import {RequestInterceptor} from '../types/request-interceptor';
import {ResponseInterceptor} from '../types/response-interceptor';
import { RouteDefinition } from '../types/route-definition';

export class RouteManager<ExactClient extends Client<unknown, unknown>> {
    readonly routeDefinitions: RouteDefinition[];
    readonly client: ExactClient;
  
    constructor(routeDefinitions: RouteDefinition[], client: ExactClient) {
      this.routeDefinitions = routeDefinitions;
      this.client = client;
    }
  
    resolveParams = () => {
      return this.routeDefinitions.reduce((params: RouteDefinition['params'], routeDefinition: RouteDefinition) => {
        return {
          ...params,
          ...routeDefinition.params,
        };
      }, {});
    };

    resolvePath = () => {
      return this.routeDefinitions.map((definition) => definition.path.replace(/^\/+|\/+$/g, '')).join('/')
    }
  
    /**
     * Build url from route definitions.
     */
    resolveUrl = () => {
      let builtUrl = this.resolvePath();
  
      return Object.entries(this.resolveParams()).reduce((url: string, [key, value]) => {
        return url.replace(`{${key}}`, String(value));
      }, builtUrl);
    };
  
    resolveInterceptors = () => {
      return this.routeDefinitions.reduce(
        (resultingInterceptors, routeDefinition: RouteDefinition) => {
          return {
            request: [...resultingInterceptors.request, ...(routeDefinition.interceptors?.request || [])],
            response: [...resultingInterceptors.response, ...(routeDefinition.interceptors?.response || [])],
          };
        },
        { request: [] as RequestInterceptor[], response: [] as ResponseInterceptor[] },
      );
    };
  
    resolveConfig = () => {
      return this.routeDefinitions.reduce((config: RequestConfig, routeDefinition: RouteDefinition) => {
        return {
          ...config,
          ...(routeDefinition.requestConfig ?? {}),
        };
      }, {} as RequestConfig);
    };
  
    request = async <Data = any, Config extends RequestConfig = RequestConfig>(requestConfig?: Partial<Config>) => {
      const definition = this.lastDefinition();
      const interceptors = this.resolveInterceptors();
  
      const config = interceptors.request.reduce((config, interceptor) => (typeof interceptor === 'function' ? interceptor(config) : interceptor.interceptor(config)), {
        ...this.resolveConfig(),
        url: this.resolveUrl(),
        method: definition?.method || HttpMethod.GET,
        params: this.resolveParams(),
        definition,
        ...requestConfig,
      });
  
      return interceptors.response.reduce(
        (response, interceptor) => (typeof interceptor === 'function' ? interceptor(response) : interceptor.interceptor(response)),
        await this.client.request<Data>(config),
      );
    };
  
    private lastDefinition = () => this.routeDefinitions[this.routeDefinitions.length - 1];
  }
   