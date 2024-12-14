import { BiTransferAlt } from "react-icons/bi";
import { CiWallet } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import {
  FaAmazon,
  FaBriefcaseMedical,
  FaHotel,
  FaShoppingCart,
  FaSpotify,
  FaWater,
  FaYoutube,
} from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { IoFastFoodOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdBedroomParent,
  MdCarRental,
  MdFlightTakeoff,
  MdOutlineContactSupport,
  MdOutlineGames,
  MdOutlinePayment,
} from "react-icons/md";
import { RiExchangeBoxLine, RiNetflixFill } from "react-icons/ri";
import {
  SiEventbrite,
  SiFreelancer,
  SiUdemy,
  SiWikimediafoundation,
} from "react-icons/si";
import { TbBrandFiverr, TbClock, TbSolarElectricity } from "react-icons/tb";
import { AiOutlineInsurance } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
export const sidebarLinks = [
  {
    route: "/account",
    title: "Dashboard",
    svg: <HiOutlineHome />,
    slug: "account",
  },

  {
    route: "/account/transfer",
    title: "Transfer",
    svg: <BiTransferAlt />,
    slug: "transfer",
  },
  {
    route: "/account/transactions",
    title: "Transactions",
    svg: <TbClock />,
    slug: "transactions",
  },
  {
    route: "/account/payments",
    title: "Payments",
    svg: <MdOutlinePayment />,
    slug: "payments",
  },
  {
    route: "/account/notifications",
    title: "Notifications",
    svg: <IoMdNotificationsOutline />,
    slug: "notifications",
  },
];

export const sidebarLinksTwo = [
  {
    route: "/account/settings",
    title: "Settings",
    svg: <IoSettingsOutline />,
    slug: "settings",
  },
  {
    route: "/account/support",
    title: "Support",
    svg: <MdOutlineContactSupport />,
    slug: "support",
  },
];
export const sidebarLinksThree = [
  {
    route: "#",
    title: "Logout",
    svg: <FiLogOut />,
    slug: "logout",
  },
];

export const cashFlowButtons = [
  {
    title: "Income",
    id: 0,
  },
  {
    title: "Outcome",
    id: 1,
  },
  {
    title: "Bills & Payments",
    id: 2,
  },
];

export const navbar = [
  {
    route: "#account_management",
    id: 1,
    name: "Account Mangement",
  },
  {
    route: "#about_us",
    id: 2,
    name: " About Us",
  },
  {
    route: "#my_card",
    id: 3,
    name: "My Card",
  },

  {
    route: "#crypto",
    id: 4,
    name: "Crypto",
  },
];
export const bills = [
  {
    title: "Shopping",
    id: 1,
    svg: <FaShoppingCart className="text-[#c6116b] " />,
    svgColDark: "#341725",
  },
  {
    title: "Food",
    id: 2,
    svg: <IoFastFoodOutline className="text-[#1184c6] " />,
    svgColDark: "#172e34",
  },
  {
    title: "Medical",
    id: 3,
    svg: <FaBriefcaseMedical className="text-[#1135c6] " />,
    svgColDark: "#1b1734",
  },
  {
    title: "Foundation",
    id: 4,
    svg: <SiWikimediafoundation className="text-[#c611c0] " />,
    svgColDark: "#2e1734",
  },
  {
    title: "Spotify",
    id: 5,
    svg: <FaSpotify className="text-[#11c64a] " />,
    svgColDark: "#173420",
  },
  {
    title: "Netflix",
    id: 7,
    svg: <RiNetflixFill className="text-[#ff4738] " />,
    svgColDark: "#3b1f1d",
  },
  {
    title: "Amazon",
    id: 8,
    svg: <FaAmazon className="text-[#1135c6] " />,
    svgColDark: "#1b1734",
  },
  {
    title: "Upwork",
    id: 9,
    svg: <FaUpwork className="text-[#38ff45]  " />,
    svgColDark: "#1e3b1d",
  },
  {
    title: "Fiverr",
    id: 10,
    svg: <TbBrandFiverr className="text-[#ffc038] " />,
    svgColDark: "#3b381d",
  },
  {
    title: "Udemy",
    id: 11,
    svg: <SiUdemy className="text-[#c611c0] " />,
    svgColDark: "#2e1734",
  },
  {
    title: "Electricity Bill",
    id: 12,
    svg: <TbSolarElectricity className="text-[#ff4738] " />,
    svgColDark: "#3b1f1d",
  },
  {
    title: "Water Bill",
    id: 13,
    svg: <FaWater className="text-[#1184c6] " />,
    svgColDark: "#172e34",
  },
  {
    title: "Rent",
    id: 14,
    svg: <MdBedroomParent className="text-[#11c64a] " />,
    svgColDark: "#173420",
  },
  {
    title: "Youtube",
    id: 15,
    svg: <FaYoutube className="text-[#ff4738] " />,
    svgColDark: "#3b1f1d",
  },
  {
    title: "Games",
    id: 16,
    svg: <MdOutlineGames className="text-[#ffc038] " />,
    svgColDark: "#3b381d",
  },
  {
    title: "Hotel Bookings",
    id: 17,
    svg: <FaHotel className="text-[#c611c0] " />,
    svgColDark: "#1b1734",
  },
  {
    title: "Flight Booking",
    id: 18,
    svg: <MdFlightTakeoff className="text-[#ff4738] " />,
    svgColDark: "#3b1f1d",
  },
  {
    title: "Car Rentals",
    id: 19,
    svg: <MdCarRental className="text-[#1184c6]  " />,
    svgColDark: "#172e34",
  },
  {
    title: "Telephone Bill",
    id: 20,
    svg: <BsFillTelephoneFill className="text-[#c6116b] " />,
    svgColDark: "#341725",
  },
];

export const RESULT_PER_PAGE = 6;
