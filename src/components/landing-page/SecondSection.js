"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendarCheck } from "react-icons/fa";
import SecondSectionDisplay from "./SecondSectionDisplay";
import SecondSectionDisplayTwo from "./SecondSectionDisplayTwo";
import SecondSectionDisplayThree from "./SecondSectionDisplayThree";
import Heading from "../ui/Heading";
function SecondSection() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <section
      id="about_us"
      className="w-full flex flex-col mt-32 lg:mt-80 h-full "
    >
      <Heading
        first="Daily Finances"
        second="Efficiency at its best: Apex's daily finance"
        third="Empowering global finance management."
        svg={<FaCalendarCheck />}
      />

      <SecondSectionDisplay />
      <SecondSectionDisplayTwo />
      <SecondSectionDisplayThree />
    </section>
  );
}

export default SecondSection;
