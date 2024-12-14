import SupportRow from "./SupportRow";

function SecondSupport() {
  return (
    <>
      <h2 className="text-center text-xl pt-5 pb-3 font-semibold">
        Contact Us
      </h2>
      <p className="text-base text-zinc-400">
        If you can&apos;t find what you&apos;re looking for, our team is here to
        assist you directly. Reach out to us through any of the following
        channels:
      </p>
      <SupportRow title="Live Chat:">
        <p className="text-buttonOrange underline underline-offset-2">
          Start a live chat now
        </p>
      </SupportRow>
      <SupportRow title="Phone Support:">
        <p className="text-buttonOrange underline underline-offset-2">
          Call us at +234 90 6541 6113
        </p>
      </SupportRow>
      <SupportRow title="Email Support:">
        <p className="text-buttonOrange underline underline-offset-2">
          Send us an email at odionsamuel2005@gmail.com
        </p>
      </SupportRow>
      <SupportRow title="Visit Us:">
        <p className="text-buttonOrange underline underline-offset-2">
          Find the nearest branch using our Branch Locator.
        </p>
      </SupportRow>
    </>
  );
}

export default SecondSupport;
