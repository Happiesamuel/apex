"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaApple,
  FaArrowRight,
  FaCalendarCheck,
  FaGoogle,
} from "react-icons/fa";
import { PiDevicesFill } from "react-icons/pi";
import { Button } from "../ui/button";
import Heading from "../ui/Heading";

function ThirdSection() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const boxes = [
    {
      svg: <FaApple />,
      id: 1,
      title: "Apple Pay",
      content:
        "Experience convinience and sophisication in every transaction. Discover how our new card transforms the way you manage your money.",
    },
    {
      svg: <FaGoogle />,
      id: 2,
      title: "Google Pay",
      content:
        "Enjoy the ease of use with Google Pay, enabling you to make payments with your Apex Card using your Andriod device.",
    },
    {
      svg: <PiDevicesFill />,
      id: 3,
      title: "Contactless access",
      content:
        "Experience convinience and sophisication. See how our contcacless feacture transforms your money management.",
    },
  ];

  return (
    <section
      id="my_card"
      className="w-full flex flex-col mt-28  h-full pt-20 rounded-t-[30px] section-3"
    >
      <Heading
        first="Card Functions"
        second=" Unlocking the power of your Apex card"
        third="Discover the functions that maked your card more than just payment."
        svg={<FaCalendarCheck />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-5 md:px-32 pb-8 mt-20 ">
        {boxes.map((box) => (
          <div
            data-aos="zoom-in-up"
            data-aos-duration="700"
            key={box.id}
            className="flex flex-col gap-4 items-start bg-bgBlur rounded-3xl shadow-md shadow-black p-5 border border-b-transparent border-r-transparent  border-buttonOrange md:last:col-span-2 lg:last:col-span-1"
          >
            <div className="text-3xl text-buttonOrange/80">{box.svg}</div>
            <h2 className="text-zinc-300 text-xl">{box.title}</h2>
            <p className="text-sm text-zinc-400">{box.content}</p>
            <Button className="shadow-sm shadow-zinc-950 text-zinc-400 border  !border-b-transparent !border-r-transparent  border-buttonOrange bg-transparent rounded-full">
              Learn more{" "}
              <span className="text-zinc-900 bg-zinc-100 rounded-full p-1">
                <FaArrowRight />
              </span>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ThirdSection;
