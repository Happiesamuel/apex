"use client";
import Popup from "../ui/Popup";
import { Toast } from "@/lib/utils";
import apexLogo from "@/../public/asset/apex-logo.png";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateNotification } from "@/hooks/useCreateNotification";
function DashboardPopup({ user }) {
  const { updateUser, status } = useUpdateUser();
  const { createNotification } = useCreateNotification();
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
    createNotification(
      {
        title: "Welcome",
        message: `You've been credited $500 to start banking with us...You can transfer as well as pay some of your bills on Apex bank online and also request for loan if you need to pay or transfer urgently!`,
        senderName: "Apex",
        image: apexLogo.src,
        status: false,
        senderId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        recieverId: user["$id"],
        recieverName: user.fullName,
      },
      {
        onError: () =>
          Toast({
            description: "failed to create notificatiion.",
            title: "Notification error",
          }),
        onSuccess: () =>
          Toast({
            title: "Notification",
            description: `1 new notification!`,
          }),
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
