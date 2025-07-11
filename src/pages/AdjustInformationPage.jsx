import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import { FaUser } from "react-icons/fa";
import "./AdjustInformationPage.css";

const AdjustInformationPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();

  // Form state - Initialize empty, will be populated from user data
  const [formData, setFormData] = useState({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Initialize form data based on user role
    if (user && user.profile) {
      if (user.role === "student") {
        setFormData({
          fullName: user.profile.fullName || "",
          studentId: user.profile.studentId || "",
          class: user.profile.class || "",
          faculty: user.profile.faculty || "",
          gender: user.profile.gender || "",
          phone: user.profile.phone || "",
          address: user.profile.address || "",
          year: user.profile.year || "",
        });
      } else if (user.role === "organization") {
        setFormData({
          name: user.profile.name || "",
          description: user.profile.description || "",
          type: user.profile.type || "",
          contactEmail: user.profile.contactEmail || "",
          contactPhone: user.profile.contactPhone || "",
          faculty: user.profile.faculty || "",
        });
      } else if (user.role === "union_office") {
        setFormData({
          name: user.profile.name || "",
          description: user.profile.description || "",
          type: user.profile.type || "",
          contactEmail: user.profile.contactEmail || "",
          contactPhone: user.profile.contactPhone || "",
          faculty: user.profile.faculty || "",
        });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInformation = (e) => {
    e.preventDefault();

    console.log("AdjustInformationPage - Submitting form with data:", formData);
    console.log("AdjustInformationPage - Current user before update:", user);

    // Update profile using auth context
    const result = updateProfile(formData);

    console.log("AdjustInformationPage - Update result:", result);

    if (result.success) {
      alert("Information updated successfully!");
      console.log(
        "AdjustInformationPage - Navigating back to personal-information"
      );
      navigate("/personal-information");
    } else {
      alert("Error updating information: " + result.message);
      console.error("AdjustInformationPage - Update failed:", result.message);
    }
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
      <div className="adjust-info-page">
        <div className="adjust-info-container">
          {/* Left Side - User Avatar and Name */}
          <div className="user-profile-section">
            <div className="user-avatar">
              <FaUser className="avatar-icon" />
            </div>
            <h2 className="user-name">{getUserDisplayName().toUpperCase()}</h2>
          </div>

          {/* Right Side - Information Form */}
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

            <form onSubmit={handleUpdateInformation}>
              {user.role === "student" && (
                <div className="info-row">
                  <span className="info-label">Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleInputChange}
                    className="info-input"
                    required
                  />
                </div>
              )}

              {(user.role === "organization" ||
                user.role === "union_office") && (
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="info-input"
                    required
                  />
                </div>
              )}

              {user.role === "student" && (
                <>
                  <div className="info-row">
                    <span className="info-label">Student ID</span>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      required
                    />
                  </div>

                  <div className="info-row">
                    <span className="info-label">Class</span>
                    <input
                      type="text"
                      name="class"
                      value={formData.class || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      required
                    />
                  </div>

                  <div className="info-row">
                    <span className="info-label">Faculty</span>
                    <input
                      type="text"
                      name="faculty"
                      value={formData.faculty || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      required
                    />
                  </div>

                  <div className="info-row">
                    <span className="info-label">Gender</span>
                    <select
                      name="gender"
                      value={formData.gender || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </>
              )}

              {(user.role === "organization" ||
                user.role === "union_office") && (
                <>
                  <div className="info-row">
                    <span className="info-label">Description</span>
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="info-row">
                    <span className="info-label">Type</span>
                    <input
                      type="text"
                      name="type"
                      value={formData.type || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      required
                    />
                  </div>

                  <div className="info-row">
                    <span className="info-label">Contact Email</span>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      required
                    />
                  </div>

                  <div className="info-row">
                    <span className="info-label">Contact Phone</span>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone || ""}
                      onChange={handleInputChange}
                      className="info-input"
                      required
                    />
                  </div>

                  <div className="info-row">
                    <span className="info-label">Faculty</span>
                    <input
                      type="text"
                      name="faculty"
                      value={formData.faculty || ""}
                      onChange={handleInputChange}
                      className="info-input"
                    />
                  </div>
                </>
              )}

              <button type="submit" className="update-info-btn">
                Update Information
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdjustInformationPage;
