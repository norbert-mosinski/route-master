import { RequestConfig } from "./request-config";
import { Response } from "./response";

export interface Client<OriginalResponse>
{
    request: <Data = any, Config extends RequestConfig = any>(requestConfig: Config) => Promise<Response<OriginalResponse, Data>>;
}