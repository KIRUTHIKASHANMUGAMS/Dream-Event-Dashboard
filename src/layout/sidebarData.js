import React from "react";
import { FaChartLine } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { LuWallet } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbCalendarTime } from "react-icons/tb";


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    title: "Event",
    icon: <MdOutlineDateRange />,
    subNav: [
            {
              title: "Event List",
              path: "/eventList",
              icon: <TbCalendarTime />,
            },
            {
              title: "Create Event",
              path: "/createEvent",
              icon: <TbCalendarTime />,
            },
    ]
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
    title: "Transcation",
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
