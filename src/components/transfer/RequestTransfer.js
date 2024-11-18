"use client";
import React, { useState } from "react";
import TransferForm from "./TransferForm";
import { Button } from "../ui/button";
import RequestForm from "./RequestLoan";

export default function RequestTransfer({ user }) {
  const [id, setId] = useState(null);
  return (
    <div>
      {!id ? (
        <div className="flex gap-3 items-center my-3">
          <Button onClick={() => setId(1)} className="bg-buttonOrange">
            Transfer
          </Button>
          <Button onClick={() => setId(2)} className="bg-bgBlur">
            Request Loan
          </Button>
        </div>
      ) : id === 1 ? (
        <TransferForm setId={setId} userAcc={user} />
      ) : (
        <RequestForm setId={setId} user={user} />
      )}
    </div>
  );
}
