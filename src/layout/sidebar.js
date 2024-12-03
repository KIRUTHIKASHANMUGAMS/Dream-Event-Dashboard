import styled from "styled-components";
import Cookies from "universal-cookie";

import { SidebarData } from "./sidebarData";
import SubMenu from "./subMenu";

const SidebarNav = styled.nav`
  background: #fffefe;
  width: 280px;
  height: 100vh;
  z-index: 1;
  flex-direction: column;
  position: fixed;
  top: 70px;
  left: 0;
  padding: 25px;
  border-radius: 0 12px 12px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

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
  const cookies = new Cookies();
  const roles = cookies.get("roles"); // Get role permissions from cookies


  // Check if user has permission to view the sidebar item
  const hasPermission = (featureName) => {
    // Find the role permissions for the SuperAdmin role
    const rolePermissions = roles[0].rolePermissions;

    // Find the feature permissions
    const featurePermissions = rolePermissions.find(
      (role) => role.featureName === featureName
    );

    // Check if permissions exist and if the user has "View" permission
    return (
      featurePermissions &&
      featurePermissions.permissions.some(
        (perm) => perm.permissionName === "View"
      )
    );
  };

  return (
    <SidebarNav>
      <LogoContainer>
        {/* Logo or other elements here */}
      </LogoContainer>

      {SidebarData.filter((item) => hasPermission(item.featureName)).map(
        (item, index) => {
          return <SubMenu item={item} key={index} />;
        }
      )}
    </SidebarNav>
  );
};

export default Sidebar;
