"use client";
function error({ error, reset }) {
  return <div className="text-zinc-100">{error.message}</div>;
}

export default error;
