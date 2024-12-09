"use client";
import { useEffect, useState } from "react";

export function useBillsLocalStorage(value, key) {
  const [data, setData] = useState(function () {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : value;
    }
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(data));
    },
    [key, data]
  );
  return [data, setData];
}

// import { useEffect, useState } from "react";

// export function useLocalStorage(initialValue, key) {
//   const [isDarkmode, setIsdarkmode] = useState(function () {
//     const val = localStorage.getItem(key);
//     return val ? JSON.parse(val) : initialValue;
//   });
//   useEffect(
//     function () {
//       localStorage.setItem(key, JSON.stringify(isDarkmode));
//     },
//     [isDarkmode, key]
//   );
//   return [isDarkmode, setIsdarkmode];
// }
