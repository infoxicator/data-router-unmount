import {
  createMemoryRouter,
  RouterProvider,
  useLoaderData,
  Link,
} from 'react-router-dom';

import './index.css';

let router = createMemoryRouter([
  {
    path: '/',
    loader: () => ({ message: 'Hello Data Router!' }),
    Component() {
      let data = useLoaderData() as { message: string };
      return (
        <>
          <Link to="/test">go to test</Link>
          <h1>{data.message}</h1>
        </>
      );
    },
  },
  {
    path: '/test',
    Component() {
      return <h1>hello test</h1>;
    },
  },
]);
export { router };

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
