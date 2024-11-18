// import { getUser, getUsers } from "@/lib/action";
// import { auth } from "@/lib/auth";

import { auth } from "@/lib/auth";
import Link from "next/link";

const page = async () => {
  // const data = await getUsers();

  const session = await auth();
  console.log(session);
  // const data = await getUser("jane@gmail.com");

  // const a = data.map((x) => console.log(x.data()));
  return (
    <div className="">
      <div>pages</div>
      <Link href="/account">dashboard</Link>
      {/* <Sign /> */}
    </div>
  );
};

export default page;
