"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function Heading({ first, second, third, svg }) {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col gap-3 items-center justify-center w-[80%] lg:w-[50%]">
        <h2
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="flex items-center gap-2 text-sm bg-bgBlur p-1 px-2 rounded-full text-buttonOrange"
        >
          {svg}
          <p>{first}</p>
        </h2>
        <h2
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="text-3xl lg:text-5xl font-bold text-center"
        >
          {second}
        </h2>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="700"
          className="text-center text-zinc-300"
        >
          {third}
        </p>
      </div>
    </div>
  );
}

export default Heading;
