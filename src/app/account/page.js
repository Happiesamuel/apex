import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log(session);
  return <div>page</div>;
};

export default page;
