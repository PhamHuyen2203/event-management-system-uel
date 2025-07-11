import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";
import logoUEL from "../assets/logo UEL.png";
import nameUEL from "../assets/name-project.png";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setShowUserDropdown(!showUserDropdown);
  };

  const handlePersonalInfo = () => {
    setShowUserDropdown(false);
    navigate("/personal-information");
  };

  const handleLogout = () => {
    setShowUserDropdown(false);
    logout();
    navigate("/");
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user || !user.profile) return "Guest";
    // For organization and union_office, prefer 'name' field, otherwise use fullName
    if (user?.role === "organization" || user?.role === "union_office") {
      return (
        user.profile.name || user.profile.fullName || user.username || "User"
      );
    }
    return user.profile.fullName || user.username || "User";
  };

  // Check if a nav link should be active based on current path
  const isNavLinkActive = (targetPath) => {
    const currentPath = location.pathname;

    // Exact match for most pages
    if (currentPath === targetPath) {
      return true;
    }

    // Special cases for homepage/dashboard
    if (
      targetPath === "/dashboard" &&
      (currentPath === "/" || currentPath === "/dashboard")
    ) {
      return isAuthenticated;
    }

    if (targetPath === "/" && currentPath === "/" && !isAuthenticated) {
      return true;
    }

    return false;
  };

  // Render navigation links based on user role
  const renderNavLinks = () => {
    if (!isAuthenticated || !user) {
      // Default navigation for non-authenticated users
      return (
        <>
          <button
            className={`nav-link ${isNavLinkActive("/") ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            Homepage
          </button>
          <button
            className={`nav-link ${isNavLinkActive("/events") ? "active" : ""}`}
            onClick={() => navigate("/events")}
          >
            UEL Events
          </button>
        </>
      );
    }

    switch (user.role) {
      case "student":
        return (
          <>
            <button
              className={`nav-link ${
                isNavLinkActive("/dashboard") ? "active" : ""
              }`}
              onClick={() => navigate("/dashboard")}
            >
              Homepage
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/events") ? "active" : ""
              }`}
              onClick={() => navigate("/events")}
            >
              UEL Events
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/registered-events") ? "active" : ""
              }`}
              onClick={() => navigate("/registered-events")}
            >
              Registered Events
            </button>
          </>
        );

      case "organization":
        return (
          <>
            <button
              className={`nav-link ${
                isNavLinkActive("/dashboard") ? "active" : ""
              }`}
              onClick={() => navigate("/dashboard")}
            >
              Homepage
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/events") ? "active" : ""
              }`}
              onClick={() => navigate("/events")}
            >
              UEL Events
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/manage-events") ? "active" : ""
              }`}
              onClick={() => navigate("/manage-events")}
            >
              Manage Events
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/our-events") ? "active" : ""
              }`}
              onClick={() => navigate("/our-events")}
            >
              Our Events
            </button>
          </>
        );

      case "union_office":
        return (
          <>
            <button
              className={`nav-link ${
                isNavLinkActive("/dashboard") ? "active" : ""
              }`}
              onClick={() => navigate("/dashboard")}
            >
              Homepage
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/events") ? "active" : ""
              }`}
              onClick={() => navigate("/events")}
            >
              UEL Events
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/manage-events") ? "active" : ""
              }`}
              onClick={() => navigate("/manage-events")}
            >
              Manage Events
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/our-events") ? "active" : ""
              }`}
              onClick={() => navigate("/our-events")}
            >
              Our Events
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/evaluate-events") ? "active" : ""
              }`}
              onClick={() => navigate("/evaluate-events")}
            >
              Evaluate Events
            </button>
          </>
        );

      default:
        return (
          <>
            <button
              className={`nav-link ${isNavLinkActive("/") ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              Homepage
            </button>
            <button
              className={`nav-link ${
                isNavLinkActive("/events") ? "active" : ""
              }`}
              onClick={() => navigate("/events")}
            >
              UEL Events
            </button>
          </>
        );
    }
  };

  return (
    <header className="header">
      {/* Top contact bar */}
      <div className="header-top">
        <div className="contact-info">
          <a
            href="tel:02837244539"
            className="contact-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOutlinePhoneInTalk className="contact-icon" />
            Call us: 028 37244539
          </a>
          <a
            href="mailto:cntt@uel.edu.vn"
            className="contact-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOutlineEmail className="contact-icon" />
            E-mail: cntt@uel.edu.vn
          </a>
        </div>
        <div className="header-icons">
          <div className="notification-icon">
            <MdNotificationsNone className="notification-icon" />
          </div>
          <div className="user-menu" ref={dropdownRef}>
            <div className="user-icon" onClick={handleUserIconClick}>
              <FaUser className="user-icon" />
            </div>
            {isAuthenticated && showUserDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-item user-name">
                  {getUserDisplayName()}
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handlePersonalInfo}>
                  Personal Information
                </button>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="header-main">
        <div className="logo-section">
          <div className="logo-container">
            <img src={logoUEL} alt="UEL Logo" className="logo-image" />
            <img
              src={nameUEL}
              alt="Name UEL"
              className="name-image"
              style={{
                height: "30px",
              }}
            />
          </div>
        </div>

        <nav className="main-nav">{renderNavLinks()}</nav>
      </div>
    </header>
  );
};

export default Header;
