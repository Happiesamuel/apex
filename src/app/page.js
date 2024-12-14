import FirstSection from "@/components/landing-page/FirstSection";
import Footer from "@/components/landing-page/Footer";
import FourthSection from "@/components/landing-page/FourthSection";
import SecondSection from "@/components/landing-page/SecondSection";
import ThirdSection from "@/components/landing-page/ThirdSection";
import React from "react";

const page = () => {
  return (
    <div className="text-zinc-50">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </div>
  );
};

export default page;
