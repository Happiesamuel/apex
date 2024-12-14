"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendarCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import Image from "next/image";
import img from "@/../public/asset/zeal.png";

function FourthSectionTwo() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-40 my-20 space-y-12 ">
      <div className="w-full lg:w-[50%] space-y-3 ">
        <h2
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="flex items-center w-max gap-2 text-sm bg-bgBlur p-1 px-2 rounded-full text-buttonOrange"
        >
          <FaCalendarCheck />
          <p>Cryptocurrency</p>
        </h2>
        <h3
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className=" text-3xl w-full lg:w-[60%]"
        >
          Join the crypto revolution with Apex
        </h3>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="text-zinc-300 w-full lg:w-[60%]"
        >
          Invest in the future safe and profitable asset for everyone.
        </p>
        <Button
          data-aos="zoom-in-up"
          data-aos-duration="700"
          className="bg-buttonOrange rounded-full"
        >
          Get started
        </Button>
      </div>
      <div
        data-aos="zoom-in-up"
        data-aos-duration="700"
        className="w-full lg:w-[50%] flex items-center justify-center  "
      >
        <Image
          src={img}
          width={400}
          quality={100}
          height={400}
          alt="transfer"
          className="rounded-lg "
        />
      </div>
    </div>
  );
}

export default FourthSectionTwo;
