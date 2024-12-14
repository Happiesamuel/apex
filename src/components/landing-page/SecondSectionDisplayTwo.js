"use client";
import Image from "next/image";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function SecondSectionDisplayTwo() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 items-center gap-6 lg:gap-3 px-5 md:px-32 pb-8 ">
      <div
        data-aos="zoom-in-up"
        data-aos-duration="500"
        className="bg-bgBlur flex flex-col gap-4 px-3 pt-5 pb-2 justify-center items-center rounded-3xl shadow-sm shadow-black"
      >
        <h1 className="text-xl">Analytics</h1>
        <p className="text-zinc-300 text-center text-sm px-8 lg:px-0">
          Gain insight into your financial habits with advanced analytics aiding
          informed decision and effective financial management{" "}
        </p>
        <div className="relative aspect-auto w-full h-[120px]">
          <Image
            src="/asset/second-1.png"
            fill
            className="rounded-md"
            alt="img-1"
          />
        </div>
      </div>
      <div
        data-aos="zoom-in-up"
        data-aos-duration="500"
        className="bg-bgBlur flex flex-col gap-4 md:gAp-2 px-3 pt-5 pb-6 lg:pb-4 justify-center items-center rounded-3xl shadow-sm shadow-black"
      >
        <h1 className="text-xl">Budgeting</h1>
        <p className="text-zinc-300 text-center text-sm px-8 lg:px-0">
          Take control of your finance with our budgeting features, managing
          income and expenses to meet oir finance goals
        </p>
        <div className="flex flex-col w-full">
          <div className="relative aspect-auto w-full h-[62px]">
            <Image
              src="/asset/second-2.png"
              fill
              className="rounded-md"
              alt="img-1"
            />
          </div>
          <div className="relative aspect-auto w-full h-[62px]">
            <Image
              src="/asset/second-3.png"
              fill
              className="rounded-md"
              alt="img-1"
            />
          </div>
        </div>
      </div>

      <div
        data-aos="zoom-in-up"
        data-aos-duration="500"
        className="md:last:col-span-2 lg:last:col-span-1 bg-bgBlur flex flex-col gap-4 px-3 pt-5 pb-2 justify-center items-center rounded-3xl shadow-sm shadow-black"
      >
        <h1 className="text-xl">Account</h1>
        <p className="text-zinc-300 text-center text-sm px-8 lg:px-0">
          Effortlesly manage your account with our user-friendly platform,
          ensuring a clear overview of your finance
        </p>
        <div className="flex flex-col w-full gap-2">
          <div className="relative aspect-auto w-full h-[20px]">
            <Image
              src="/asset/second-4.png"
              fill
              className="rounded-md"
              alt="img-1"
            />
          </div>
          <div className="relative aspect-auto w-full h-[20px]">
            <Image
              src="/asset/second-5.png"
              fill
              className="rounded-md"
              alt="img-1"
            />
          </div>
          <div className="relative aspect-auto w-full h-[20px]">
            <Image
              src="/asset/second-6.png"
              fill
              className="rounded-md"
              alt="img-1"
            />
          </div>
          <div className="relative aspect-auto w-full h-[20px]">
            <Image
              src="/asset/second-7.png"
              fill
              className="rounded-md"
              alt="img-1"
            />
          </div>
          <div className="relative aspect-auto w-full h-[20px]">
            <Image
              src="/asset/second-4.png"
              fill
              className="rounded-md"
              alt="img-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondSectionDisplayTwo;
