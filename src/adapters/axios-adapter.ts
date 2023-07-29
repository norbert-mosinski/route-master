import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpMethod } from '../enums/http-method';
import { Client } from '../types/client';
import { RequestConfig } from '../types/request-config';

type AxiosConfig = RequestConfig & { axiosConfig?: AxiosRequestConfig };

export class AxiosAdapter implements Client<AxiosResponse, AxiosError> {
  request = <Data = any, Config extends AxiosConfig = RequestConfig>(requestConfig: Config) => {
    return axios({
      ...(requestConfig.axiosConfig ?? {}),
      method: this.resolveMethod(requestConfig.method),
      url: requestConfig.url,
      data: requestConfig.data,
    })
      .then((axiosResponse) => ({
        data: axiosResponse.data as Data,
        status: axiosResponse.status,
        originalResponse: axiosResponse as AxiosResponse<Data>,
        requestConfig,
      }))
      .catch((error) => {
        const axiosError = error as AxiosError;

        // do not throw error if server responded
        if (axiosError.response) {
          return {
            data: axiosError.response.data as Data,
            status: axiosError.response.status as number,
            originalResponse: axiosError.response as AxiosResponse,
            originalError: axiosError,
            requestConfig,
          };
        }

        throw axiosError;
      });
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
