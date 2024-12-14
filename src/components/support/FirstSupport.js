import Link from "next/link";
import SupportRow from "./SupportRow";

function FirstSupport() {
  return (
    <>
      <h2 className="text-center text-xl pt-5 font-semibold">
        How Can We Help You Today?
      </h2>
      <div className="pt-8 space-y-4">
        <div className="">
          <h2 className="text-zinc-200 font-semibold">Account Support</h2>
          <SupportRow title="Forgot your password?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Reset your password
            </Link>
          </SupportRow>
          <SupportRow title="Need to update your account information?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Manage your account
            </Link>
          </SupportRow>
          <SupportRow title="Questions about account opening?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Learn more about accounts
            </Link>
          </SupportRow>
        </div>

        <div className="">
          <h2 className="text-zinc-200 font-semibold">Transaction Issues</h2>
          <SupportRow title="Problem with a recent transaction?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Report a transaction
            </Link>
          </SupportRow>
          <SupportRow title="Want to track a payment?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Track payment status
            </Link>
          </SupportRow>
          <SupportRow title="Refund or chargeback assistance?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Get help with refunds
            </Link>
          </SupportRow>
        </div>

        <div className="">
          <h2 className="text-zinc-200 font-semibold">Transaction Issues</h2>

          <SupportRow title="Lost or stolen card?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Block your card immediately
            </Link>
          </SupportRow>

          <SupportRow title=" Need a new card?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              Request a replacement
            </Link>
          </SupportRow>
          <SupportRow title=" Issues with card payments?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              {" "}
              Get card support
            </Link>
          </SupportRow>
        </div>

        <div className="">
          <h2 className="text-zinc-200 font-semibold">Loans & Mortgages</h2>
          <SupportRow title=" Questions about loans or repayment?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              {" "}
              Loan FAQs
            </Link>
          </SupportRow>
          <SupportRow title=" Need to update loan details?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              {" "}
              Manage your loan
            </Link>
          </SupportRow>
          <SupportRow title=" Want to apply for a new loan?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              {" "}
              Start your application
            </Link>
          </SupportRow>
        </div>

        <div className="">
          <h2 className="text-zinc-200 font-semibold">Digital Banking</h2>
          <SupportRow title=" Problems logging in?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              {" "}
              Login support
            </Link>
          </SupportRow>
          <SupportRow title=" Need help with the mobile app?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              {" "}
              App support
            </Link>
          </SupportRow>
          <SupportRow title=" Want to set up online banking?">
            <Link
              className="text-buttonOrange underline underline-offset-2"
              href="/auth/reset-password"
            >
              {" "}
              Get started with online banking
            </Link>
          </SupportRow>
        </div>
      </div>
    </>
  );
}

export default FirstSupport;
