import * as React from "react";
import * as ReactDOM from "react-dom/client";
import type { Router } from '@remix/run/router';
import {
  createMemoryRouter,
  useLoaderData,
  Link,
  RouterProvider,
} from "react-router-dom";

const routes = [
  {
    path: "/",
    loader: () => ({
      message: "Hello Data Router! " + Math.round(Math.random() * 100),
    }),
    Component() {
      let data = useLoaderData() as { message: string };
      return (
        <>
          <h1>Home - {data.message}</h1>
          <Link to="/test">go to test</Link>
        </>
      );
    },
  },
  {
    path: "/test",
    Component() {
      return (
        <>
          <h1>Test</h1>
          <Link to="/">go to home</Link>
        </>
      );
    },
  },
];

function initRouter() {
  return createMemoryRouter(routes);
}

let router: Router | null;

export default function App() {
  const [showRouter, setShowRouter] = React.useState(false);
  return (
    <>
      <button
        onClick={() => {
          if (showRouter) {
            setShowRouter(false);
            router = null;
          } else {
            setShowRouter(false);
            router = initRouter();
          }
        }}
      >
        toggle router
      </button>
      {showRouter ? 
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} /> : 
        <p>Router unmounted</p>}
    </>
  );
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
