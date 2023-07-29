import { RequestConfig } from './request-config';

export interface Response<OriginalResponse = any, Data = any, OriginalError = any, Config extends RequestConfig = RequestConfig> {
  data: Data;
  status: number;
  originalResponse: OriginalResponse;
  originalError?: OriginalError;
  requestConfig: Config;
}
