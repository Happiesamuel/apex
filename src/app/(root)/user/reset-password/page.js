import { SigninForm } from "@/components/authlayout/SigninForm";
import React from "react";

const page = () => {
  return (
    <div className="w-[80%] mt-3">
      <SigninForm type="reset" />
    </div>
  );
};

export default page;
