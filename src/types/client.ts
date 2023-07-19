import { RequestConfig } from "./request-config";
import { Response } from "./response";

export interface Client<OriginalResponse, OriginalError> {
  request: <Data = any, Config extends RequestConfig = RequestConfig>(requestConfig: Config) => Promise<Response<OriginalResponse, Data, OriginalError, Config>>;
}