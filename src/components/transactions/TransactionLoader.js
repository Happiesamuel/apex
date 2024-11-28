import { MoonLoader } from "react-spinners";
import TransactionHead from "./TransactionHead";

function TransactionLoader({ type }) {
  return (
    <div>
      <TransactionHead type={type} />
      <div
        className={`flex flex-col items-center justify-center ${
          !type ? " h-[200px]" : "h-[100px]"
        }`}
      >
        <MoonLoader speedMultiplier={0.5} color="#ea763d" size={30} />
        <p className="text-zinc-400 text-sm mt-3">Loading Transactions...</p>
      </div>
    </div>
  );
}

export default TransactionLoader;
