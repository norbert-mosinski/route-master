import { AxiosAdapter } from '../src/adapters/axios-adapter';
import { HttpMethod } from '../src/enums/http-method';
import { RouteBuildService } from '../src/services/route-build-service';
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
const builtRoutes = routeBuildService.buildRoutes(testRoutesBag, axiosAdapter);

test('Path is being resolved correctly', () => {
  expect(builtRoutes.users().show(1).resolvePath()).toBe('users/{userId}');
  expect(builtRoutes.posts().show(2).resolvePath()).toBe('posts/{postId}');
});

test('URL is being resolved correctly', () => {
  expect(builtRoutes.users().show(1).resolveUrl()).toBe('users/1');
  expect(builtRoutes.posts().show(2).resolveUrl()).toBe('posts/2');
});