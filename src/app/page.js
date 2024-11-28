import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1>sam</h1>
      <Link href="/auth/sign-in">sign in</Link>
      <Link href="/account">dashboard</Link>
    </div>
  );
};

export default page;
