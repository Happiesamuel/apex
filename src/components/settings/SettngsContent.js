import { FaRegEdit } from "react-icons/fa";
import SettingsName from "./SettingsName";
import SetPinDialog from "./SetPinDialog";
import SetDisplayNameDialog from "./SetDisplayNameDialog";
import SetAvatarDialog from "./SetAvatarDialog";
import { SignOutModal } from "../authlayout/SignOutModal";
import SetCountryDialog from "./SetCountryDialog";
import { getCountries } from "@/lib/action";
import Image from "next/image";
import Setter from "./Setter";
import DeleteAccountModal from "./DeleteAccountModal";

async function SettngsContent({ user }) {
  const countries = await getCountries();
  const [country, flag] = user?.nationality?.split("%");
  return (
    <div className="mt-10 pb-20 gap-4 grid  grid-cols-1 gap-y-5 md:grid-cols-2 items-center">
      <Setter
        title="Display Name"
        content={<p> {user.displayName ? user.displayName : user.fullName}</p>}
      >
        <SetDisplayNameDialog user={user} />
      </Setter>

      <Setter title="Set Transfer Pin" content={<p>****</p>}>
        <SetPinDialog user={user} />
      </Setter>

      <Setter title="Change Avatar" content={<p>Update your avatar</p>}>
        <SetAvatarDialog user={user} />
      </Setter>

      <Setter
        title="Set Country"
        content={
          <div className="flex items-center gap-1">
            {flag && (
              <Image
                src={flag}
                width={20}
                height={20}
                alt={`flag of ${country}`}
              />
            )}
            <p>{country}</p>
          </div>
        }
      >
        <SetCountryDialog countries={countries} user={user} />
      </Setter>

      <Setter
        title="Deactivate your Account"
        content={
          <DeleteAccountModal id={user.$id}>
            <p className="cursor-pointer text-red-500">
              Delete your Apex account?
            </p>
          </DeleteAccountModal>
        }
      ></Setter>

      <Setter
        title="Logout"
        content={
          <SignOutModal>
            <p className="cursor-pointer">Logout from Apex?</p>
          </SignOutModal>
        }
      ></Setter>
    </div>
  );
}

export default SettngsContent;
