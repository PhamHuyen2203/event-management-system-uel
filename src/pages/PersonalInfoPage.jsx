import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import backgroundLogin from "../assets/background-login.png";
import "./PersonalInfoPage.css";

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    gender: "",
    faculty: "",
    class: "",
  });
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("PersonalInfoPage - Submitting form data:", formData);

      // Update profile using AuthContext
      const result = updateProfile(formData);

      console.log("PersonalInfoPage - Update result:", result);

      if (result.success) {
        alert("Personal information saved successfully!");
        console.log("PersonalInfoPage - Navigating to dashboard");
        navigate("/dashboard");
      } else {
        alert("Error saving information: " + result.message);
        console.error("PersonalInfoPage - Save failed:", result.message);
      }
    } catch (error) {
      console.error("PersonalInfoPage - Submit error:", error);
      alert("An error occurred while saving information");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="personal-info-main">
      {/* Hero section with background */}
      <div className="personal-info-hero">
        <div className="personal-info-hero-image">
          <img src={backgroundLogin} alt="Background" />
          <div className="personal-info-hero-overlay"></div>
        </div>
      </div>

      {/* Form section */}
      <div className="personal-info-content">
        <div className="personal-info-form-container">
          <div className="personal-info-header">
            <div className="personal-info-icon">
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <h1 className="personal-info-title">PERSONAL INFORMATION</h1>
          </div>

          <form className="personal-info-form" onSubmit={handleSubmit}>
            <div className="personal-info-input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="personal-info-input"
                required
              />
            </div>

            <div className="personal-info-input-group">
              <input
                type="text"
                name="studentId"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={handleInputChange}
                className="personal-info-input"
                required
              />
            </div>

            <div className="personal-info-input-group">
              <div className="gender-container">
                <span className="gender-label">Gender</span>
                <div className="gender-options">
                  <label className="gender-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Nam"
                      checked={formData.gender === "Nam"}
                      onChange={handleInputChange}
                    />
                    <span className="gender-text">Nam</span>
                  </label>
                  <label className="gender-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Nữ"
                      checked={formData.gender === "Nữ"}
                      onChange={handleInputChange}
                    />
                    <span className="gender-text">Nữ</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="personal-info-input-group">
              <input
                type="text"
                name="faculty"
                placeholder="Faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                className="personal-info-input"
                required
              />
            </div>

            <div className="personal-info-input-group">
              <input
                type="text"
                name="class"
                placeholder="Class"
                value={formData.class}
                onChange={handleInputChange}
                className="personal-info-input"
                required
              />
            </div>

            <button
              type="submit"
              className="personal-info-confirm-btn"
              disabled={loading}
            >
              {loading ? "SAVING..." : "CONFIRM"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PersonalInfoPage;
