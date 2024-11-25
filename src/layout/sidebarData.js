import React from "react";
import { FaChartLine } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { LuWallet } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";



export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    title: "Event",
    path: "/eventList",
    icon: <MdOutlineDateRange />,
   
  },
  {
    title: "Bookings",
    path: "/booking",
    icon: <LuClipboardCheck />,

  },
  {
    title: "Customer",
    path: "/customer",
    icon: <FaUsers />,
  },
  {
    title: "Transaction",
    path: "/transaction",
    icon: <LuWallet />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <FaChartLine />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoSettingsOutline />,
  },
  
];
