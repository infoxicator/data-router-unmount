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

const MountRouter = () => {
  let [router, setRouter]: Router | null = React.useState();
  React.useEffect(() => {
    setRouter(createMemoryRouter(routes));
    console.log(router)
    return () => {
      setRouter(null);
    }
  }, [])

  if (!router) return <>loading...</>

  return (
  <RouterProvider router={router} fallbackElement={<p>Loading...</p>} /> )
}

export default function App() {
  const [showRouter, setShowRouter] = React.useState(false);
  return (
    <>
      <button
        onClick={() => {
          if (showRouter) {
            setShowRouter(false);
          } else {
            setShowRouter(true);
          }
        }}
      >
        toggle router
      </button>
      {showRouter ? 
        <MountRouter /> : 
        <p>Router unmounted</p>}
    </>
  );
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);