"use client";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  const socials = [
    {
      id: 1,
      svg: <FaXTwitter />,
    },
    {
      id: 2,
      svg: <FaLinkedinIn />,
    },
    {
      id: 3,
      svg: <FaFacebookF />,
    },
    {
      id: 4,
      svg: <FaInstagram />,
    },
  ];

  const menus = [
    {
      title: "Sections",
      bars: ["Personal", "Business", "Comapany"],
    },
    {
      title: "Help",
      bars: ["Privacy", "Complaints", "Cookies Policy"],
    },
    {
      title: "Company policies",
      bars: ["Website terms", "Legal Agreements", "Modern slavery Policy"],
    },
  ];
  return (
    <footer className="bg-bgBlur flex lg:flex-row flex-col justify-between gap-4 lg:items-end pt-5 lg:pt-10 pb-4 lg:pb-8 rounded-3xl mx-4 md:mx-8 mb-4 px-4 lg:px-8">
      <div className="flex items-start justify-start lg:items-end lg:justify-end">
        <h2 className="text-2xl font-semibold">Apex</h2>
      </div>

      <div className="grid grid-cols-2 space-y-4 items-start justify-start md:flex md:justify-between md:items-center w-full lg:w-[50%] pb-4 lg:pb-16 ">
        {menus.map((menu) => (
          <div className="flex flex-col gap-2 lg:gap-4" key={menu.title}>
            <h2 className="text-xl text-zinc-200">{menu.title}</h2>
            <div className="space-y-2">
              {menu.bars.map((bar) => (
                <p className="text-sm text-zinc-400" key={bar}>
                  {bar}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-end">
        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <div
              key={social.id}
              className="text-base text-buttonOrange bg-backgroundColor rounded-md p-1"
            >
              {social.svg}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
