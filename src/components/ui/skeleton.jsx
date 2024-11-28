import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse  bg-zinc-300/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
