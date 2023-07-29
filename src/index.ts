import { AxiosAdapter } from './adapters/axios-adapter';
import { RouteBuildService } from './services/route-build-service';

export const client = new RouteBuildService();

export const axiosAdapter = new AxiosAdapter();
