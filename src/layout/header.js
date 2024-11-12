


import React, { useEffect, useState } from "react";
import styled from "styled-components";

import bell from "../assets/bell.png";
import gift from "../assets/gift.png";
import logo from "../assets/logo.png";
import profile from "../assets/Profile.png";
import search from "../assets/search.png";
import unitedState from "../assets/unitedState.png";

const ToggleButton = styled.button`
  display: none;

  @media (max-width: 1330px) {
    margin-left: auto; // Align it to the right
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    display: block; // Show the button on smaller screens
  }
`;

function Header({ toggleSidebar, isOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1330);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1330);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <img src={logo} alt="logo" className="logo" />
        <span className="logo-content"> Dream Event</span>
      </div>
    
      <div className="profile-container">
        <div className="wrapper">
          <div className="icon"><img src={search} alt="search" /></div>
          <input className="input" placeholder="Search" />
        </div>
        <div className="userOptions">
          <img src={unitedState} alt="united" />
          <select>
            <option className="language" value="en">ENGLISH</option>
          </select>
        </div>
        <img src={bell} alt="bell" />
        <img src={gift} alt="gift" />
        {isMobile && (
        <ToggleButton
          onClick={toggleSidebar}
          aria-expanded={isOpen}
          id="toggle-button"
          aria-controls="sidebar"
        >
          {isOpen ? "✖" : "☰"}
        </ToggleButton>
      )}
        <div className="userInfo">
          <img src={profile} alt="User Icon" />
          <div className="profile-content">
            <span className="userName">Minato Namikaze</span>
            <p className="header-owner">Owner</p>
          </div>
          <div className="event-icons"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
