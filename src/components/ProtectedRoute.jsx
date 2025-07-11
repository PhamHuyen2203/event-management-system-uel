import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectTo = "/login",
}) => {
  const { isAuthenticated, user, loading, canAccessRoute } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang kiểm tra xác thực...</p>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if allowedRoles is specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardRoute = getDashboardRoute(user.role);
    return <Navigate to={dashboardRoute} replace />;
  }

  // Check route-specific access control
  if (!canAccessRoute(location.pathname)) {
    const dashboardRoute = getDashboardRoute(user.role);
    return <Navigate to={dashboardRoute} replace />;
  }

  // All checks passed - render the protected component
  return children;
};

// Helper function to get dashboard route based on role
const getDashboardRoute = (role) => {
  switch (role) {
    case "student":
      return "/dashboard";
    case "organization":
      return "/dashboard";
    case "union_office":
      return "/dashboard";
    default:
      return "/login";
  }
};

// Higher-order component for role-specific protection
export const withRoleProtection = (Component, allowedRoles) => {
  return (props) => (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Specific role-based protection components
export const StudentProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["student"]}>{children}</ProtectedRoute>
);

export const OrganizationProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["organization"]}>{children}</ProtectedRoute>
);

export const UnionOfficeProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["union_office"]}>{children}</ProtectedRoute>
);

// Admin protection (union_office only)
export const AdminProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["union_office"]}>{children}</ProtectedRoute>
);

// Multiple roles protection
export const MultiRoleProtectedRoute = ({ children, roles }) => (
  <ProtectedRoute allowedRoles={roles}>{children}</ProtectedRoute>
);

export default ProtectedRoute;
