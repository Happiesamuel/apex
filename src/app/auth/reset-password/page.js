import { SigninForm } from "@/components/authlayout/SigninForm";
export async function generateMetadata() {
  return {
    title: `Reset your password`,
  };
}
function page() {
  return (
    <div className="w-[80%] mt-3">
      <SigninForm type="reset" />
    </div>
  );
}

export default page;
