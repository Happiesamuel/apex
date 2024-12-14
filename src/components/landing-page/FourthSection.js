"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendarCheck } from "react-icons/fa";
import Image from "next/image";
import Heading from "../ui/Heading";
import FourthContent from "./FourthContent";
import FourthSectionTwo from "./FourthSectionTwo";
import FourthSectionThree from "./FourthSectionThree";

function FourthSection() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  return (
    <section id="crypto" className="w-full flex flex-col mt-28 h-full ">
      <Heading
        first="Investments"
        second="Spend, save and manage your money, all in one place"
        third="Open a full bank account from your phone for free."
        svg={<FaCalendarCheck />}
      />
      <div className="  grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-8 mt-10 w-full px-5 lg:px-40">
        <div className="bg-bgBlur rounded-2xl p-5 h-full">
          <FourthContent
            first="Security that never sleeps"
            second="Projected by a 2500-strong, 24/7 dedicated team. Apex outcome saves more than $200M in potentially frudent transactions in 2024 alone."
            third="Explore security"
          />
          <div className="flex" data-aos="zoom-in-up" data-aos-duration="700">
            <div className="rounded-lg  mt-16 mb-16 relative w-[200px] h-[280px] aspect-auto">
              <Image
                src="/asset/card-2.png"
                className="rounded-2xl"
                fill
                quality={100}
                alt="transfer"
              />
            </div>
            <div className="rounded-lg  mt-16 mb-16 relative left-[-90px] top-[50px] w-[200px] h-[280px] aspect-auto">
              <Image
                src="/asset/card-3.png"
                fill
                className="rounded-2xl"
                quality={100}
                alt="transfer"
              />
            </div>
          </div>
        </div>
        <div className="bg-bgBlur rounded-2xl p-5">
          <FourthContent
            first="Free global transfers"
            second="Experience the freedom of hassive-free transfer with our free transfer admin financial app. Say goodbye to unnecessary fee and enjoy transactions."
            third="Explore transfers"
          />
          <div
            className="flex flex-col mt-16 mb-5 gap-3"
            data-aos="zoom-in-up"
            data-aos-duration="700"
          >
            <div className="rounded-lg   relative w-full h-[90px] aspect-auto">
              <Image
                src="/asset/bills.png"
                className="rounded-2xl"
                fill
                quality={100}
                alt="transfer"
              />
            </div>
            <div className="rounded-lg   relative w-full h-[90px] aspect-auto">
              <Image
                src="/asset/bills.png"
                className="rounded-2xl"
                fill
                quality={100}
                alt="transfer"
              />
            </div>
            <div className="rounded-lg   relative w-full h-[90px] aspect-auto">
              <Image
                src="/asset/bills.png"
                className="rounded-2xl"
                fill
                quality={100}
                alt="transfer"
              />
            </div>
          </div>
        </div>
      </div>
      <FourthSectionTwo />
      <FourthSectionThree />
    </section>
  );
}

export default FourthSection;
