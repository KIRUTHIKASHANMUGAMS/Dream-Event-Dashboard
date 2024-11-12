
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "./header";
import Sidenav from "./sidebar";

const LayoutContainer = styled.div`
  display:flex;


   @media (max-width: 1300px) {
   display:block;
     height: 100vh;

 }
`;

const SidebarContainer = styled.div`
  width: 280px;
  background: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "translateX(1)" : "translateX(-100%)")};
      opacity:1;

  @media (min-width: 1300px) {
    transform: translateX(0); // Always show sidebar
    position:fixed;
    height:100vh
  }
`;

const ContentContainer = styled.div`
   flex: 1;
  display: flex;
  flex-direction: column;


    @media (min-width: 1300px) {
  margin-left: 280px;
  height:100vh;
  }

`;

const HeaderContainer = styled.header`
  background: #fff;
  padding: 20px;
  position: fixed;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Content = styled.main`
  flex: 1;
  padding: 147px 10px 20px;
  background-color: rgba(255, 252, 246, 1);
  overflow-y: auto;
`;

function Main({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    if (window.innerWidth < 1300) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleClickOutside = (event) => {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-button');

    if (
      isOpen &&
      sidebar &&
      !sidebar.contains(event.target) &&
      toggleButton &&
      !toggleButton.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false); // Close sidebar on route change

  }, [location]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <HeaderContainer>
        <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
      </HeaderContainer>
      <LayoutContainer>
        <SidebarContainer id="sidebar" isOpen={isOpen}>
          <Sidenav />
        </SidebarContainer>
        <ContentContainer>
          <Content>{children}</Content>
        </ContentContainer>
      </LayoutContainer>
    </div>
  );
}

export default Main;
