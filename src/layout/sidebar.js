import styled from "styled-components";

import { SidebarData } from "./sidebarData";
import SubMenu from "./subMenu";

const SidebarNav = styled.nav`
  background: #fffefe;
  width: 280px; // Increased width for better spacing
  height: 100vh; // Full height
  display: flex;
  z-index:1;

  flex-direction: column;
  position: fixed; // Fixed position
  top: 91px;
  left: 0;
  padding: 25px;
  border-radius: 0 12px 12px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Sidebar = () => {
  return (
    <SidebarNav>
      <LogoContainer>
        
      </LogoContainer>
      {SidebarData.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })}
    </SidebarNav>
  );
};

export default Sidebar;
