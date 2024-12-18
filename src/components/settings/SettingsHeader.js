import Image from "next/image";
import UserImg from "@/../public/asset/user-img.png";
function SettingsHeader({ user }) {
  const [country, flag] = user?.nationality?.split("%");
  return (
    <header className="flex flex-col items-center justify-center mt-12">
      <div className="relative aspect-auto w-[80px] h-[80px]">
        <Image
          src={!user.image ? UserImg : user.image}
          className="rounded-full object-cover object-center"
          fill
          alt="user-img"
        />
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl">
          {user.displayName ? user.displayName : user.fullName}
        </h1>
        {flag && (
          <Image src={flag} width={30} height={30} alt={`flag of ${country}`} />
        )}
      </div>
      <p className="text-sm text-zinc-400">{user.email}</p>
    </header>
  );
}

export default SettingsHeader;
