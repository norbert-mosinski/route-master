export interface Response<OriginalResponse = any, Data = any>
{
    data: Data;
    status: number;
    originalResponse: OriginalResponse;
}