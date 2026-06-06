import React from "react";

export type UserRole =
  | "Admin"
  | "Procurement Officer"
  | "Vendor"
  | "Manager";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  currentRole: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  currentRole,
  children,
  fallback = null,
}) => {
  const hasAccess =
    allowedRoles.includes(currentRole);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGuard;