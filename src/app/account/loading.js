import apexImg from "@/../public/asset/apex-logo.png";
import Image from "next/image";
function loading() {
  return (
    <div className=" bg-backgroundColor fixed top-0 left-0 text-zinc-100 z-[9999] flex flex-col items-center justify-center h-screen w-full">
      <div className="loader flex items-center flex-col gap-3">
        <div className="bg-buttonOrange p-3 rounded-full">
          <Image src={apexImg} alt="apex-logo" width={40} height={40} />
        </div>
        <p className="text-lg">Apex Bank</p>
      </div>
    </div>
  );
}

export default loading;
