import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  justify-content: space-between;
  padding-left: 10px; /* Fixed missing semicolon */
  align-content: center;
  align-items: center;
  list-style: none;
  height: 48px;
  text-decoration: none;
  font-size: 16px;
  padding: 12px 24px;

  &.active {
    background: rgba(246, 176, 39, 0.8);
    font-weight: bold; 
    padding: 12px 24px;
    border-radius: 10px;
    color: rgba(18, 18, 18, 1);

  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  position: relative;
  top: 2px;
  font-family: outfit;
  font-size: 16px;
  font-weight: 700;
  line-height: 34px;
  color: rgba(117, 117, 117, 1);
  text-align: left;


`;

const DropdownLink = styled(Link)`
  background: #fbfbfb;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  &.active {
    background: rgba(246, 176, 39, 0.8); 
    font-weight: bold;   
    padding: 12px 24px;
    color: rgba(18, 18, 18, 1);

    border-radius: 10px;
  }
`;

const SubMenu = ({ item, closeSidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const location = useLocation(); // Get current location

  const showSubnav = () => {
    setSubnav(!subnav);
    // Close the sidebar only when toggling main item, not sub-items
    if (closeSidebar && !subnav) {
      closeSidebar(); // Close sidebar only if opening the subnav
    }
  };

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav ? showSubnav : undefined}
        className={location.pathname === item.path ? "active" : ""}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((subItem, index) => {
          return (
            <DropdownLink
              to={subItem.path}
              key={index}
              className={location.pathname === subItem.path ? "active" : ""}
              onClick={(e) => {
                // Prevent sidebar from closing when sub-item is clicked
                e.stopPropagation();
                // Optionally, you can add logic here if you want to close the sidebar on main item click
                // closeSidebar(); // Uncomment if you want to close sidebar after selecting a sub-item
              }}
            >
              {subItem.icon}
              <SidebarLabel>{subItem.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
