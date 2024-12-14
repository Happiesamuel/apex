"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Navbar from "../ui/Navbar";
import Img from "@/../public/asset/dashboard.png";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import MobileNav from "../ui/MobileNav";

function FirstSection() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    // <div className="px-4 lg:px-20  section min-h-[40vh] lg:min-h-[53vh]">
    <div className="px-4 lg:px-20  section min-h-[100%]">
      <Navbar />
      <MobileNav />
      <section
        id="account_management"
        className="w-full flex flex-col justify-center items-center relative pb-16 md:pb-20 pt-16 "
      >
        <div className="w-full lg:w-[75%] text-center space-y-3 mt-16 mb-10 md:mb-5">
          <h3
            data-aos="zoom-in-up"
            data-aos-duration="500"
            className="text-backgroundColor text-3xl lg:text-5xl font-bold text-center leading-tight"
          >
            Smartest technology platform to modernize financial management
          </h3>
          <p
            data-aos="zoom-in-up"
            data-aos-duration="700"
            className="lg:text-base text-sm text-backgroundColor"
          >
            Everything you need to control and optimize your financial
            operations, all on one.
          </p>
          <Button
            data-aos="zoom-in-up"
            data-aos-duration="900"
            className="bg-backgroundColor "
          >
            <Link href="/account">Start banking with us</Link>
          </Button>
        </div>
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1100"
          className=" absolute top-[75%] w-full flex items-center justify-center"
        >
          <Image src={Img} alt="dashboard" quality={100} className=" pt-6  " />
        </div>
      </section>
    </div>
  );
}

export default FirstSection;
