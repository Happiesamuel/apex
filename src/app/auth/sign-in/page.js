import AuthOptions from "@/components/authlayout/AuthOptions";
import { SigninForm } from "@/components/authlayout/SigninForm";
import Link from "next/link";
export async function generateMetadata() {
  return {
    title: `Sign in`,
  };
}
function page() {
  return (
    <div className="w-[90%] md:w-[80%] mt-3">
      <SigninForm type="sign-in" />
      <div className="flex items-center justify-between w-full mb-3 mx-2">
        <Link
          className="text-zinc-400 text-xs md:text-sm "
          href="/auth/reset-password"
        >
          Forgotten password?
        </Link>
        <Link
          className="text-zinc-400 text-xs md:text-sm "
          href="/auth/sign-up"
        >
          Don&apos;t have an account? Sign up{" "}
        </Link>
      </div>
      <AuthOptions />
    </div>
  );
}

export default page;
