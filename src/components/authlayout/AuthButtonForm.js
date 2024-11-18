import Image from "next/image";
import { Button } from "../ui/button";

function AuthButtonForm({ action, type, name, color }) {
  return (
    <form action={action}>
      <Button className={`flex gap-2 items-center py-1 bg-[${color}] `}>
        {/* <Button className={`bg-[#1d203b] `}> */}
        <Image
          width={20}
          height={20}
          src={`https://authjs.dev/img/providers/${type}.svg`}
          alt="google image"
        />
        <p className="text-zinc-300">Sign in with {name}</p>
      </Button>
    </form>
  );
}

export default AuthButtonForm;
