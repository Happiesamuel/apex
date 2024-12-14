import SupportRow from "./SupportRow";

function FourthSupport() {
  return (
    <>
      <h2 className="text-center text-xl pt-5 pb-3 font-semibold">
        Security & Fraud Support
      </h2>
      <p className="text-base text-zinc-400">
        We take your security seriously. If you suspect fraudulent activity or
        unauthorized access to your account:
      </p>
      <SupportRow title="Call our 24/7 Fraud Helpline at">
        <p className="text-buttonOrange underline underline-offset-2">
          +234 90 6541 6113
        </p>
      </SupportRow>
      <SupportRow title="Learn how to protect yourself from scams:">
        <p className="text-buttonOrange underline underline-offset-2">
          Security Tips
        </p>
      </SupportRow>
    </>
  );
}

export default FourthSupport;
