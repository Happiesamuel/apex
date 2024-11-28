import { Skeleton } from "../ui/skeleton";

function SkeletonLoader() {
  return (
    <div className="mt-6">
      <div className="flex justify-end">
        <Skeleton className="h-2 w-[110px] rounded-md" />
      </div>
      <div className="flex flex-col gap-3 ">
        {Array.from({ length: 3 }).map((x, i) => (
          <div key={i} className="flex flex-col space-y-2">
            <Skeleton className="h-2 w-[110px] rounded-md" />
            <div className="">
              {Array.from({ length: i + 1 }).map((y, b) => (
                <Skeleton
                  key={b}
                  className="h-16 w-full first:rounded-t-md last:rounded-b-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;
