import AuthButtonForm from "./AuthButtonForm";
import { signInWithGoogleAction } from "@/lib/action";

function AuthOptions() {
  return (
    <div className="w-full flex items-center flex-col gap-4 mt-3">
      <div className="relative">
        <p
          className="after before:bg-zinc-800 after:bg-zinc-800 before:w-[80%] 
        after:w-[80%] md:before:w-full md:after:w-full after:top-[50%]
         before:top-[50%] before:h-[1px] after:h-[1px] before:absolute after:absolute after:ml-[4px]
         before:left-[-83%] md:before:left-[-103%]"
        >
          Other log in options
        </p>
      </div>
      <div className="flex  item-center justify-center gap-2">
        <AuthButtonForm
          type="google"
          name="Google"
          action={async () => {
            "use server";
            await signInWithGoogleAction();
          }}
          color="#3b1f1d"
        />
        <AuthButtonForm
          type="facebook"
          name="Facebook"
          color="#1d203b"
          action={signInWithGoogleAction}
        />
      </div>
    </div>
  );
}

export default AuthOptions;
