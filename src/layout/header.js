import React, { useEffect, useState } from "react";
import Toast from 'react-bootstrap/Toast';
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import styled from "styled-components";
import Cookies from "universal-cookie";

import Gift from "../assets/icons/gift.svg";
import Notification from "../assets/icons/notification.svg";
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
  const [show, setShow] = useState(false); // Corrected state declaration
  const cookies = new Cookies(null, { path: "/" });
  const handleShow = () => setShow(prev => !prev); // Toggle show state
    const roles = cookies.get("roles"); 
  const name = cookies.get("name"); 



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1330);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {

    cookies.remove('refreshToken');
    cookies.remove('token');
    cookies.remove('user');
    cookies.remove('roles')
    window.location.href = '/';
  
  };


  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <img src={logo} alt="logo" className="logo" />
        <h1> Dream Event</h1>
      </div>

      <div className="profile-container">
        <div className="wrapper">
          <div className="icon"><img src={search} alt="search" /></div>
          <input className="input" placeholder="Search" />
        </div>
        <div className="userOptions">
          <img src={unitedState} alt="united" />
          <select>
            <option value="en">ENGLISH</option>
          </select>
        </div>
        <div className="imageBorder"><img src={Gift} alt="gift" width="24px" height="24px" /></div>
        <div className="imageBorder"><img src={Notification} alt="notification" width="24px" height="24px" /></div>

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

        <img src={profile} alt="User Icon" width="50px" height="50px" />
        <div>
          <div className="profile-content d-flex align-items-center gap-3" onClick={handleShow}>
            <div>
            
              <h3>{name}</h3>
              {roles.map((role) => (
              <p className="header-owner">{role.roleName}</p>
              ))}
            </div>
       
          <div className="event-icons" ></div>
          </div>
        </div>

      </div>

      <Toast show={show} onClose={handleShow} style={{ position: 'absolute', top: '70px', right: '15px', width: "10%", padding: "20px" }}>
        <Toast.Body style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="d-flex align-items-center gap-3">
            <CgProfile size={18} />
            <h4 style={{ margin: 0 }}>Profile</h4>
          </div>
          <div className="d-flex align-items-center gap-3" onClick={handleLogout}>
            <MdOutlineLogout size={18} />
            <h4 style={{ margin: 0 }}>Logout</h4>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default Header;
