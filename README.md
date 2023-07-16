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
Import RouteMaster into your project:

```ts
import RouteMaster from 'routemaster';
```

Define your routes using RouteMaster's simple syntax:
```
const routes = RouteMaster.createRoutes([
  {
    name: 'home',
    path: '/',
    // Additional configuration options here
  },
  // Define more routes as needed
]);

```

Attach interceptors to routes for handling pre-processing or authentication:
```ts
const routes = RouteMaster.createRoutes([
  {
    name: 'home',
    path: '/',
    interceptors: [
      // Interceptor functions here
    ],
  },
  // Define more routes with interceptors
]);
```
Integrate with your preferred HTTP client, such as Axios or Fetch, to handle the actual requests:
```ts
const client = axios.create();
const routeWrapper = RouteMaster.createRouteWrapper(routes, client);
```
Now you can make requests to your defined routes using the routeWrapper object:
```ts
routeWrapper.home()
  .then(response => {
    // Handle the response
  })
  .catch(error => {
    // Handle the error
  });
```
For more detailed usage examples and configuration options, please refer to the documentation.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License
RouteMaster is open source and released under the MIT License.
