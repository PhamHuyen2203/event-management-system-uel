import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdViewList } from "react-icons/md";
import "./PersonalInformationPage.css";
import { FaUser } from "react-icons/fa";

const PersonalInformationPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleViewRegisteredEvents = () => {
    navigate("/registered-events");
  };

  const handleAdjustInformation = () => {
    navigate("/adjust-information");
  };

  // Helper function to get user info safely
  const getUserInfo = (field, defaultValue = "N/A") => {
    const value = user?.profile?.[field];
    // Chỉ return defaultValue khi field thực sự undefined/null, không phải chuỗi rỗng
    if (value === undefined || value === null) {
      return defaultValue;
    }
    // Nếu là chuỗi rỗng, hiển thị "Chưa cập nhật" thay vì "N/A"
    if (value === "") {
      return "Chưa cập nhật";
    }
    return value;
  };

  const getUserDisplayName = () => {
    // For organization and union_office, prefer 'name' field, otherwise use fullName
    if (user?.role === "organization" || user?.role === "union_office") {
      return (
        user?.profile?.name ||
        user?.profile?.fullName ||
        user?.username ||
        "User"
      );
    }
    return user?.profile?.fullName || user?.username || "User";
  };

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="personal-info-page">
        <div className="personal-info-container">
          {/* Left Side - User Avatar and Name */}
          <div className="user-profile-section">
            <div className="user-avatar">
              <FaUser className="avatar-icon" />
            </div>
            <h2 className="user-name">{getUserDisplayName().toUpperCase()}</h2>
          </div>

          {/* Right Side - Information Card */}
          <div className="info-card">
            <h1
              className="card-title"
              style={{
                fontSize: "26px",
                fontWeight: "bold",
              }}
            >
              {user.role === "student"
                ? "PERSONAL INFORMATION"
                : "ORGANIZATION INFORMATION"}
            </h1>

            {user.role === "student" && (
              <>
                <div className="info-row">
                  <span className="info-label">Student ID</span>
                  <div className="info-value">{getUserInfo("studentId")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Class</span>
                  <div className="info-value">{getUserInfo("class")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Faculty</span>
                  <div className="info-value">{getUserInfo("faculty")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Gender</span>
                  <div className="info-value">{getUserInfo("gender")}</div>
                </div>
              </>
            )}

            {user.role === "organization" && (
              <>
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <div className="info-value">{getUserInfo("name")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Description</span>
                  <div className="info-value">{getUserInfo("description")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Type</span>
                  <div className="info-value">{getUserInfo("type")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Contact Email</span>
                  <div className="info-value">
                    {getUserInfo("contactEmail")}
                  </div>
                </div>

                <div className="info-row">
                  <span className="info-label">Contact Phone</span>
                  <div className="info-value">
                    {getUserInfo("contactPhone")}
                  </div>
                </div>

                <div className="info-row">
                  <span className="info-label">Faculty</span>
                  <div className="info-value">{getUserInfo("faculty")}</div>
                </div>
              </>
            )}

            {user.role === "union_office" && (
              <>
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <div className="info-value">{getUserInfo("name")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Description</span>
                  <div className="info-value">{getUserInfo("description")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Type</span>
                  <div className="info-value">{getUserInfo("type")}</div>
                </div>

                <div className="info-row">
                  <span className="info-label">Contact Email</span>
                  <div className="info-value">
                    {getUserInfo("contactEmail")}
                  </div>
                </div>

                <div className="info-row">
                  <span className="info-label">Contact Phone</span>
                  <div className="info-value">
                    {getUserInfo("contactPhone")}
                  </div>
                </div>

                <div className="info-row">
                  <span className="info-label">Faculty</span>
                  <div className="info-value">{getUserInfo("faculty")}</div>
                </div>
              </>
            )}

            {user.role === "student" && (
              <button
                className="view-events-btn"
                onClick={handleViewRegisteredEvents}
              >
                <MdViewList className="btn-icon" />
                View all registered events
              </button>
            )}

            <button
              className="adjust-info-btn"
              onClick={handleAdjustInformation}
            >
              Adjust Information
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalInformationPage;
