import { FaRegEdit } from "react-icons/fa";
import SettingsName from "./SettingsName";
import SetPinDialog from "./SetPinDialog";
import SetDisplayNameDialog from "./SetDisplayNameDialog";
import SetAvatarDialog from "./SetAvatarDialog";
import { SignOutModal } from "../authlayout/SignOutModal";

function SettngsContent({ user }) {
  return (
    <div className="mt-10 space-y-4 pb-10">
      <div className="space-y-2">
        <SettingsName>Display Name:</SettingsName>
        <div className="flex justify-between items-center mx-4 text-sm">
          <p> {user.displayName ? user.displayName : user.fullName}</p>
          <SetDisplayNameDialog user={user} />
        </div>
      </div>
      <div className="space-y-2">
        <SettingsName>Set Transfer Pin:</SettingsName>
        <div className="flex justify-between items-center mx-4 text-sm">
          <p>****</p>
          <SetPinDialog user={user} />
        </div>
      </div>
      <div className="space-y-2">
        <SettingsName>Change Avatar:</SettingsName>
        <div className="flex justify-between items-center mx-4 text-sm">
          <p>Update your avatar</p>
          <SetAvatarDialog user={user} />
        </div>
      </div>
      <div className="space-y-2">
        <SettingsName>Logout:</SettingsName>
        <div className="flex justify-between items-center mx-4 text-sm">
          <SignOutModal>
            <p className="cursor-pointer">Logout from Apex?</p>
          </SignOutModal>
        </div>
      </div>
    </div>
  );
}

export default SettngsContent;
