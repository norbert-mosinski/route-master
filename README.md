# RouteMaster

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

RouteMaster is a powerful JavaScript package that simplifies route management and provides enhanced flexibility. It allows you to effortlessly define and name routes, attach interceptors to individual routes, and seamlessly integrate with popular HTTP clients like Axios or Fetch. By streamlining the process of handling routing, RouteMaster empowers developers to create efficient and scalable web applications.

## Features

- **Easy Route Definition**: Define routes with ease using RouteMaster's intuitive syntax and naming conventions.
- **Interceptor Attachments**: Attach interceptors to specific routes to handle pre-processing or authentication logic.
- **Integration with Popular HTTP Clients**: Seamlessly integrate with popular HTTP clients like Axios or Fetch to handle the actual requests.
- **Scalable and Efficient**: Streamline your routing process for improved performance and scalability.
- **Simplified Configuration**: Say goodbye to complex routing configurations and embrace the simplicity and convenience provided by RouteMaster.

## Installation

You can install RouteMaster via npm:

```bash
npm install routemaster
```

## Usage
Define your routes using RouteMaster's simple syntax:
```ts
const routes = {
  home: () => ({
    path: '/',
    method: 'GET',
    // Additional configuration options here
  }),
  // Define more routes as needed
};
```

Attach interceptors to routes for handling pre-processing or authentication:
```ts
const routes = {
  home: () => ({
    path: '/',
    method: 'GET',
    interceptors: {
      request: [
        // Interceptor functions here
      ],
      response: [
        // Interceptor functions here
      ],
    }
  }),
  // Define more routes with interceptors
};
```

Define route parameters. Every parameter defined in the route path will be replaced by the value of the corresponding parameter in the params object.
Parameters defined in params but not in the route path will be appended to the end of the route URL as query parameters or as body parameters, depending on the HTTP method.
```ts
const routes = {
  product: (id) => ({
    path: '/products/{id}',
    params: {id},
    method: 'GET',
  }),
  create: (params) => ({
    path: '/products/create',
    params,
    method: 'POST',
  }),
  // Define more routes with interceptors
};
```

The routing supports nested routes, allowing you to create hierarchical route structures. Nested routes are useful when you have a parent route that encapsulates child routes. The child routes inherit the interceptors from their parent route and have URLs that start with the parent route URL.

To define nested routes, you can include a `children` property in the route configuration object. Here's an example:

```ts
const routes = {
  users: () => ({
    path: '/users',
    method: 'GET',
    children: {
      edit: (id) => ({
        path: '/{id}/edit',
        method: 'PUT',
        // Additional configuration options for child route
      }),
     delete: (id) => ({
        path: '/{id}',
        method: 'DELETE',
        // Additional configuration options for child route
      })       
      // Define more child routes as needed
    }
  }),
  // Define more parent routes with their respective child routes
};
```

#### Building routes
Once you have defined your routes, you can build them using the RouteBuildService class:
```ts
import {AxiosAdapter} from 'routing-master';
import {RouteBuildService} from 'routing-master';

const axiosAdapter = new AxiosAdapter();
export const routes = new RouteBuildService().buildRoutes(routeDefinerBag, axiosAdapter);
```

Now you can make requests to your defined routes using the routes object:
```ts
const response = await routes.users().edit(1).request();
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License
RouteMaster is open source and released under the MIT License.
