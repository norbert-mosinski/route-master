import { AxiosAdapter } from '../src/adapters/axios-adapter';
import { HttpMethod } from '../src/enums/http-method';
import { RouteBuildService } from '../src/services/route-build-service';
import { RequestInterceptor } from '../src/types/request-interceptor';
import { ResponseInterceptor } from '../src/types/response-interceptor';

let testParam = 1;

const requestInterceptor1: RequestInterceptor = (requestConfig) => {
  testParam += 3;

  return requestConfig;
}

const requestInterceptor2: RequestInterceptor = (requestConfig) => {
  testParam /= 2;

  return requestConfig;
}

const responseInterceptor: ResponseInterceptor = (response) => {
  testParam += 1;

  return response;
}

const testRoutesBag = {
  users: () => ({
    path: 'users',
    method: HttpMethod.GET,
    children: {
      show: (userId: number) => ({
        path: '{userId}',
        method: HttpMethod.GET,
        params: {
          userId
        },
        interceptors: {
          request: [requestInterceptor1, requestInterceptor2],
          response: [responseInterceptor],
        }
    })
  }
  }),
  posts: () => ({
    path: 'posts/',
    method: HttpMethod.GET,
    children: {
      show: (postId: number) => ({
        path: '/{postId}/',
        method: HttpMethod.GET,
        params: {
          postId
        },
    })
  }
  })
};

const routeBuildService = new RouteBuildService();
const axiosAdapter = new AxiosAdapter();
// @ts-ignore
axiosAdapter.request = (requestConfig) => Promise.resolve({
  data: {},
  status: 200,
  originalResponse: {},
  requestConfig: requestConfig,
  originalError: undefined,
});
const builtRoutes = routeBuildService.buildRoutes(testRoutesBag, axiosAdapter);



test('Path is being resolved correctly', () => {
  expect(builtRoutes.users().show(1).resolvePath()).toBe('users/{userId}');
  expect(builtRoutes.posts().show(2).resolvePath()).toBe('posts/{postId}');
});

test('URL is being resolved correctly', () => {
  expect(builtRoutes.users().show(1).resolveUrl()).toBe('users/1');
  expect(builtRoutes.posts().show(2).resolveUrl()).toBe('posts/2');
});

test('Request interceptors are being called in the right order', async () => {
  builtRoutes.users().show(1).request().then(() => {
    expect(testParam).toBe(3);
  });
});