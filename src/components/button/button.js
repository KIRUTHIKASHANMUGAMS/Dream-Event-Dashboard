import React from "react";
import Cookies from "universal-cookie";

// Permission check function
const hasPermission = (featureName, permissionName) => {
  const cookies = new Cookies();
  const roles = cookies.get("roles");

  // Check if roles exist
  if (!roles || roles.length === 0) {
    return false; // No roles found
  }

  const rolePermissions = roles[0]?.rolePermissions;

  // Find the feature's permissions
  const featurePermissions = rolePermissions?.find(
    (role) => role.featureName === featureName
  );

  // Check if the user has the specified permission
  return (
    featurePermissions &&
    featurePermissions.permissions.some(
      (perm) => perm.permissionName === permissionName
    )
  );
};

// Common Button Component
function Button({ 
  name, 
  onClick, 
  type ,
  style, 
  variant,
  featureName, 
  permissionName 
}) {
  // Check permission

  const isAllowed =
  featureName && permissionName
    ? hasPermission(featureName, permissionName)
    : true; 

  // Render button with disabled state based on permission
  return (
    <button
      type={type}
      className="event-speaker-button"
      style={style}
      variant={variant}
      onClick={isAllowed ? onClick : undefined} // Only call onClick if allowed
      disabled={type === "button" && !isAllowed} // Disable if type is button and not allowed
      aria-disabled={type === "button" && !isAllowed} // For accessibility
    >
      {name}
    </button>
  );
}

export default Button;
