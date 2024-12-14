import FifthSupport from "@/components/support/FifthSupport";
import FirstSupport from "@/components/support/FirstSupport";
import FourthSupport from "@/components/support/FourthSupport";
import SecondSupport from "@/components/support/SecondSupport";
import ThirdSupport from "@/components/support/ThirdSupport";
import Link from "next/link";

function page() {
  return (
    <div className="text-zinc-100">
      <div className="space-y-2 pt-4">
        <h1 className="text-2xl font-semibold">
          Welcome to Apex Support Center
        </h1>
        <p className="text-base text-zinc-400">
          At Apex, your satisfaction and trust are our top priorities.
          We&apos;re here to help you with any questions, concerns, or
          assistance you may need.
        </p>
      </div>

      <FirstSupport />
      <SecondSupport />
      <ThirdSupport />
      <FourthSupport />
      <FifthSupport />

      <p className="text-base py-3 text-zinc-400">
        We&apos;re here to help, every step of the way. Thank you for banking
        with Apex
      </p>
    </div>
  );
}

export default page;
