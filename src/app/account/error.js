"use client";
function error({ error, reset }) {
  return <div className="">{error.message}</div>;
}

export default error;
