import SupportRow from "./SupportRow";

function FifthSupport() {
  return (
    <>
      <h2 className="text-center text-xl pt-5 pb-3 font-semibold">Feedback</h2>
      <p className="text-base text-zinc-400">
        Your feedback is valuable to us. Share your experience or let us know
        how we can improve:
      </p>
      <SupportRow title="">
        <p className="text-buttonOrange underline underline-offset-2">
          Submit Feedback
        </p>
      </SupportRow>
    </>
  );
}

export default FifthSupport;
