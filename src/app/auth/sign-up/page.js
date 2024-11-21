import { SigninForm } from "@/components/authlayout/SigninForm";
import Link from "next/link";

function page() {
  return (
    <div className="w-[80%] ">
      <SigninForm type="sign-up" />
      <Link
        className="text-zinc-400 text-sm  w-full text-right float-end "
        href="/auth/sign-in"
      >
        Already have an account? Sign in{" "}
      </Link>
    </div>
  );
}

export default page;
