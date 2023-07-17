import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpMethod } from "../enums/http-method";
import { Client } from "../types/client";
import { RequestConfig } from '../types/request-config';

type Config = RequestConfig & {axiosConfig?: AxiosRequestConfig};

export class AxiosAdapter implements Client<AxiosResponse>
{
    request = <Data = any>(requestConfig: Config) => {
        return axios({
            ...requestConfig.axiosConfig ?? {},
            method: this.resolveMethod(requestConfig.method),
            url: requestConfig.url,
            data: requestConfig.data
        }).then(axiosResponse => ({
            data: axiosResponse.data as Data,
            status: axiosResponse.status,
            originalResponse: axiosResponse as AxiosResponse<Data>
        }));
    };

    private resolveMethod = (method: HttpMethod) => {
        if(method === HttpMethod.POST)
        {
            return 'post';
        } else if(method === HttpMethod.PUT)
        {
            return 'put';
        } else if(method === HttpMethod.PATCH)
        {
            return 'patch';
        } else if(method === HttpMethod.DELETE)
        {
            return 'delete';
        };

        return 'get';
    }
}