import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in when app starts
    console.log("AuthContext - Initializing, checking for existing user...");
    const currentUser = authService.getCurrentUser();
    console.log("AuthContext - Current user from authService:", currentUser);

    if (currentUser && authService.isAuthenticated()) {
      console.log("AuthContext - User is authenticated, setting user state");
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      console.log("AuthContext - No authenticated user found");
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const result = await authService.login(username, password);

      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      } else {
        return result;
      }
    } catch (error) {
      return {
        success: false,
        message: "Có lỗi xảy ra khi đăng nhập",
      };
    }
  };

  const register = async (username, password, confirmPassword) => {
    try {
      console.log("AuthContext - Starting registration for:", username);
      const result = await authService.register(
        username,
        password,
        confirmPassword
      );

      console.log("AuthContext - Registration result:", result);

      if (result.success) {
        console.log("AuthContext - Setting user state:", result.user);
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      } else {
        return result;
      }
    } catch (error) {
      console.error("AuthContext - Registration error:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi đăng ký",
      };
    }
  };

  const logout = () => {
    const result = authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    return result;
  };

  const updateProfile = (profileData) => {
    console.log("AuthContext - Updating profile with data:", profileData);
    const result = authService.updateProfile(profileData);

    console.log("AuthContext - Update profile result:", result);

    if (result.success) {
      console.log(
        "AuthContext - Refreshing user state with updated user:",
        result.user
      );
      // ✅ Refresh user state để UI update ngay lập tức
      setUser(result.user);
    }

    return result;
  };

  const checkPermission = (permission) => {
    return authService.checkPermission(permission);
  };

  const getUserRole = () => {
    return authService.getUserRole();
  };

  const getDashboardRoute = () => {
    return authService.getDashboardRoute();
  };

  const canAccessRoute = (route) => {
    return authService.canAccessRoute(route);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    checkPermission,
    getUserRole,
    getDashboardRoute,
    canAccessRoute,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
