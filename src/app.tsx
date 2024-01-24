import Router, { router } from './router';
import React from 'react';

export default function App() {
  const [showRouter, setShowRouter] = React.useState(false);
  console.log(router);

  return (
    <>
      <button
        onClick={() => {
          router.initialize();
          setShowRouter(!showRouter);
        }}
      >
        mount router
      </button>
      {showRouter && <Router />}
    </>
  );
}
