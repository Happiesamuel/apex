"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function App({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
