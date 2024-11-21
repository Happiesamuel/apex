"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationDemo({ totalPage }) {
  const searchParams = useSearchParams();
  const [count, setCount] = useState(+searchParams.get("page") || 1);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(
    function () {
      function handleClick() {
        const params = new URLSearchParams();
        params.set("page", count);
        router.replace(`${pathname}?${params.toString()}`);
      }
      handleClick();
    },
    [count, pathname, router]
  );
  return (
    <Pagination>
      <PaginationContent>
        {count > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer text-zinc-400"
              onClick={() => {
                setCount(count - 1);
                // handleClick(count);
              }}
            />
          </PaginationItem>
        )}

        {count > 1 && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer text-zinc-400"
              onClick={() => setCount(count - 1)}
            >
              {count - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive
            className="cursor-pointer text-zinc-600 bg-zinc-300 border-none"
            onClick={() => setCount(count)}
          >
            {count}
          </PaginationLink>
        </PaginationItem>
        {count < totalPage && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer text-zinc-400"
              onClick={() => setCount(count + 1)}
            >
              {count + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          {count < totalPage && (
            <PaginationEllipsis className="text-zinc-400" />
          )}
        </PaginationItem>
        {count < totalPage && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer text-zinc-400"
              onClick={() => {
                setCount(count + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
