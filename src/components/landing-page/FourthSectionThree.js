"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendarCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import { MdOutlineSecurity } from "react-icons/md";
import { IoWalletSharp } from "react-icons/io5";
import { TiCloudStorage } from "react-icons/ti";
import { FaDroplet } from "react-icons/fa6";

function FourthSectionThree() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  const boxes = [
    {
      id: 1,
      title: "Easiness",
      content:
        "Simple and interactive interface for all users. Effortless navigation ensures seamless experience for everyone",
      svg: <FaDroplet />,
    },
    {
      id: 2,
      title: "Storage",
      content:
        "Secure asset storage. Our platform offers outing-edge security and reliable options to protect your accounts.",
      svg: <TiCloudStorage />,
    },
    {
      id: 3,
      title: "Buy/sell",
      content:
        "Instant, convinient transactions for seamless crypto management. Secure and reliable for digital assets.",
      svg: <IoWalletSharp />,
    },
    {
      id: 4,
      title: "Security",
      content:
        "High protection and confidential standards ensure your assets remain secure and private.",
      svg: <MdOutlineSecurity />,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-40 my-20 space-y-12 ">
      <div className="w-full lg:w-[50%] space-y-3 ">
        <h2
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="flex items-center w-max gap-2 text-sm bg-bgBlur p-1 px-2 rounded-full text-buttonOrange"
        >
          <FaCalendarCheck />
          <p>Advantages of Crypto</p>
        </h2>
        <h3
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className=" text-4xl w-full lg:w-[60%]"
        >
          Discover the advantages of crypto
        </h3>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="500"
          className="text-zinc-300 w-full lg:w-[60%]"
        >
          Ease to use, secure storage, effortless buying and selling.
        </p>
        <Button
          data-aos="zoom-in-up"
          data-aos-duration="700"
          className="bg-buttonOrange rounded-full"
        >
          Get started
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full lg:w-[50%]">
        {boxes.map((box) => (
          <div
            className="bg-bgBlur rounded-2xl p-4 space-y-3"
            data-aos="zoom-in-up"
            data-aos-duration="500"
            key={box.id}
          >
            <div className="text-buttonOrange text-3xl">{box.svg}</div>
            <h2 className="text-zinc-200 text-lg">{box.title}</h2>
            <p className="text-zinc-400 text-sm">{box.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FourthSectionThree;
