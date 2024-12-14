import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col h-screen md:items-center text-zinc-100">
      <div className="flex md:flex-row flex-col h-full justify-center gap-8 items-center  w-[80%]">
        <div className="space-y-3">
          <h1 className="font-semibold text-3xl">404</h1>
          <h3 className="text-xl text-300">Page not found</h3>
          <p className="text-sm text-zinc-400">
            This page doesn&apos;t exist or was removed! <br /> We suggest you
            back to home.
          </p>
          <Button className="rounded-full px-5 bg-buttonOrange">
            <Link href="/"> Back to home</Link>
          </Button>
        </div>
        <div className="flex md:block justify-end items-end w-full md:w-[30%]">
          <Image
            src="/asset/error.png"
            height={300}
            width={300}
            quality={100}
            alt="error-404"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
