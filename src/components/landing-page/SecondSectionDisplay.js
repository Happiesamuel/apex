"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendarCheck } from "react-icons/fa";
import Img from "@/../public/asset/tran.png";
import Image from "next/image";

function SecondSectionDisplay() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-5 lg:px-40 my-20 space-y-12">
      <div className="w-full lg:w-[50%] space-y-3 ">
        <h2
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="flex items-center w-max gap-2 text-sm bg-bgBlur p-1 px-2 rounded-full text-buttonOrange"
        >
          <FaCalendarCheck />
          <p>Daily Finances</p>
        </h2>
        <h3
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className=" text-3xl w-full lg:w-[60%]"
        >
          Global payments: your gateway to secure transactions
        </h3>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="text-zinc-300 w-full lg:w-[60%]"
        >
          Apex simply payments in the UK, Europe and internationally.
        </p>
      </div>
      <div
        data-aos="zoom-in-up"
        data-aos-duration="700"
        className="w-full lg:w-[50%] flex items-center justify-center  "
      >
        <div className="rounded-3xl flex items-center justify-center p-10 py-12 bg-zinc-800 ">
          <Image
            src={Img}
            width={400}
            height={400}
            alt="transfer"
            className="rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}

export default SecondSectionDisplay;
