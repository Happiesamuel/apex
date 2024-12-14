import SettingsHeader from "@/components/settings/SettingsHeader";
import SettngsContent from "@/components/settings/SettngsContent";
import { getUsersByEmail } from "@/lib/action";
import { auth } from "@/lib/auth";
import React from "react";
export async function generateMetadata() {
  return {
    title: `Settings`,
  };
}
const page = async () => {
  const session = await auth();
  const user = await getUsersByEmail(session.user.email);
  return (
    <div className="text-zinc-100">
      <SettingsHeader user={user} />
      <SettngsContent user={user} />
    </div>
  );
};

export default page;
