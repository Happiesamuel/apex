"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendarCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import Image from "next/image";
import img from "@/../public/asset/card.png";

function SecondSectionDisplayThree() {
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
          <p>Apex card</p>
        </h2>
        <h3
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className=" text-3xl w-full lg:w-[60%]"
        >
          Enhancing your Financial Experience
        </h3>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="text-zinc-300 w-full lg:w-[60%]"
        >
          Discover the range of benefits and features that makes our card stand
          out.
        </p>
        <Button
          data-aos="zoom-in-up"
          data-aos-duration="700"
          className="bg-buttonOrange rounded-full"
        >
          Get my card
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

export default SecondSectionDisplayThree;
