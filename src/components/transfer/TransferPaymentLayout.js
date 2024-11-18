import React from "react";
import TransferBalance from "./TransferBalance";
import RecentTransfer from "./RecentTransfer";
import RequestTransfer from "./RequestTransfer";

export default function TransferPaymentLayout({ user }) {
  return (
    <div>
      <TransferBalance user={user} />
      <RequestTransfer user={user} />
      <RecentTransfer user={user} />
    </div>
  );
}
