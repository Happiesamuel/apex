"use client";

import { Button } from "@/components/ui/button";
import { MdOutlineWifiOff } from "react-icons/md";

function error({ error, reset }) {
  return (
    <div className="text-zinc-100 flex flex-col items-center gap-3 justify-center min-h-[70vh]">
      <div className="text-3xl rounded-full p-3 bg-buttonOrange w-max">
        <MdOutlineWifiOff />
      </div>
      <p className="text-zinc-200 text-lg">{error.message}</p>
      <p className="text-zinc-400 text-sm">
        You&apos;re probably having a bad internet connection. Check your
        internet connection.
      </p>
      <Button className="bg-buttonOrange/80" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
}

export default error;
