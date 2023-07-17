import { RouteBuildService } from "./services/route-build-service";
import { AxiosAdapter } from './adapters/axios-adapter';

export const client = new RouteBuildService();

export const axiosAdapter = new AxiosAdapter();