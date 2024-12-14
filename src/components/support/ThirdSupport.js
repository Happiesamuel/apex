import SupportRow from "./SupportRow";

function ThirdSupport() {
  return (
    <>
      <h2 className="text-center text-xl pt-5 pb-3 font-semibold">
        Frequently Asked Questions (FAQs)
      </h2>
      <p className="text-base text-zinc-400">
        Get instant answers to common questions:
      </p>
      <SupportRow title="How do I reset my password?">
        <p className="text-buttonOrange underline underline-offset-2">
          Learn more
        </p>
      </SupportRow>
      <SupportRow title="How do I activate my debit/credit card?">
        <p className="text-buttonOrange underline underline-offset-2">
          Learn more
        </p>
      </SupportRow>
      <SupportRow title="How can I check my account balance?">
        <p className="text-buttonOrange underline underline-offset-2">
          Learn more
        </p>
      </SupportRow>
    </>
  );
}

export default ThirdSupport;
