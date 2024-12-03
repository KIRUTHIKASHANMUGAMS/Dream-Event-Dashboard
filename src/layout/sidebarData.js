import React from "react";
import { FaChartLine } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { LuWallet } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";


// Sidebar data as you have it
export const SidebarData = [
  { title: "Dashboard", path: "/dashboard", icon: <RxDashboard />, featureName: "Dashboard" },
  { title: "Role Management", path: "/roleManagement", icon: <MdOutlineManageAccounts />, featureName: "Role Management" },
  { title: "User Management", path: "/user", icon: <HiOutlineUser />, featureName: "User Management" },
  { title: "Event", path: "/eventList", icon: <MdOutlineDateRange />, featureName: "Event" },
  { title: "Bookings", path: "/booking", icon: <LuClipboardCheck />, featureName: "Bookings" },
  { title: "Customer", path: "/customer", icon: <FaUsers />, featureName: "Customer" },
  { title: "Transaction", path: "/transaction", icon: <LuWallet />, featureName: "Transaction" },
  { title: "Analytics", path: "/analytics", icon: <FaChartLine />, featureName: "Analytics" },
  { title: "Settings", path: "/settings", icon: <IoSettingsOutline />, featureName: "Settings" },
];
