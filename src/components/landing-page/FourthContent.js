"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../ui/button";

function FourthContent({ first, second, third }) {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  return (
    <div className="flex flex-col gap-4 pr-10 lg:pr-12">
      <h2
        data-aos="zoom-in-up"
        data-aos-duration="500"
        className="text-zinc-200 text-xl"
      >
        {first}
      </h2>
      <p
        data-aos="zoom-in-up"
        data-aos-duration="500"
        className="text-sm text-zinc-400"
      >
        {second}
      </p>
      <div>
        <Button
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="rounded-full bg-buttonOrange"
        >
          {third}
        </Button>
      </div>
    </div>
  );
}

export default FourthContent;
