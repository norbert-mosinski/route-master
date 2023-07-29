import { HttpMethod } from '../enums/http-method';
import { Client } from '../types/client';
import { RequestConfig } from '../types/request-config';

type FetchConfig = RequestConfig;

export class FetchAdapter implements Client<Response, Response> {
  request = async <Data = any, Config extends FetchConfig = RequestConfig>(requestConfig: Config) => {
    const response = await fetch(requestConfig.url, {
      ...(requestConfig.fetchConfig ?? {}),
      method: this.resolveMethod(requestConfig.method),
      body: JSON.stringify(requestConfig.data),
    });

    let data = {};

    try {
      data = await response.json();
    } catch (error) {
      // leave data empty
    }

    const result = {
      data: data as Data,
      status: response.status,
      originalResponse: response,
      originalError: response as typeof response | undefined,
      requestConfig,
    };

    if (response.ok) {
      delete result.originalError;
    }

    return result;
  };

  private resolveMethod = (method: HttpMethod) => {
    if (method === HttpMethod.POST) {
      return 'post';
    } else if (method === HttpMethod.PUT) {
      return 'put';
    } else if (method === HttpMethod.PATCH) {
      return 'patch';
    } else if (method === HttpMethod.DELETE) {
      return 'delete';
    }

    return 'get';
  };
}
