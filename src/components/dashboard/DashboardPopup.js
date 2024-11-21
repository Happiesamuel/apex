"use client";
import Popup from "../ui/Popup";
import { Toast } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import apexLogo from "@/../public/asset/apex-logo.png";
import { useUpdateUser } from "@/hooks/useUpdateUser";
function DashboardPopup({ user }) {
  const { updateUser, status } = useUpdateUser();

  function handleRecievePay() {
    updateUser(
      {
        id: user["$id"],
        obj: {
          totalBalance: 500,
          welcomePay: true,
        },
      },
      {
        onError: () => {
          Toast({ description: "failed to claim", title: "Claiming failed" });
        },
        onSuccess: () => {
          Toast({ description: "Claimed", title: "Claiming Successful" });
        },
      }
    );
  }
  console.log(user);
  return (
    <Popup
      open={true}
      type="welcomePay"
      handleClick={handleRecievePay}
      heading="Claim $500"
      title={`Hello ${user?.fullName}. You've been rewarded $500 for creating an apex account!. Therefore claim and start banking with us 🎉🎉`}
    />
  );
}

export default DashboardPopup;
