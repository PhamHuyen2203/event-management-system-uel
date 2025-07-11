import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import ImageSelector from "../components/ImageSelector";
import storageService from "../services/storageService";
import { FaCheck } from "react-icons/fa";
import createQRText from "../assets/create-qr-code.png";
import "./CreateEventPage.css";
import enterEventDetails from "../assets/ENTER EVENT DETAILS.png";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
    limitNumber: "",
    deadlineCancel: "",
    description: "",
    emailTemplate: "",
    category: "academic",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async () => {
    // Validation
    if (!formData.title.trim()) {
      setError("Vui lòng nhập tiêu đề sự kiện");
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setError("Vui lòng chọn thời gian bắt đầu và kết thúc");
      return;
    }
    if (!formData.location.trim()) {
      setError("Vui lòng nhập địa điểm");
      return;
    }
    if (!formData.description.trim()) {
      setError("Vui lòng nhập mô tả sự kiện");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Get organizer name from user profile
      const organizerName = user?.profile?.name || user?.username || "Unknown";

      // Prepare event data
      const eventData = {
        title: formData.title.trim(),
        organizer: organizerName,
        date: formData.startTime,
        endDate: formData.endTime,
        location: formData.location.trim(),
        limitNumber: formData.limitNumber
          ? parseInt(formData.limitNumber)
          : null,
        deadlineCancel: formData.deadlineCancel,
        description: formData.description.trim(),
        emailTemplate: formData.emailTemplate.trim(),
        category: formData.category,
        image: selectedImage || null,
        createdBy: user?.id,
      };

      // Create event using StorageService (pass user role for auto-approval)
      const result = storageService.createEvent(eventData, user?.role);

      if (result.success) {
        // Save image if exists
        if (selectedImage) {
          storageService.saveEventImage(result.event.id, selectedImage);
        }

        setShowSuccessMessage(true);
      } else {
        setError(result.message || "Có lỗi xảy ra khi tạo sự kiện");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Có lỗi xảy ra khi tạo sự kiện");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToManage = () => {
    navigate("/manage-events");
  };

  const renderStep1 = () => (
    <>
      <div className="form-section">
        <div className="form-row">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter event title"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Start time</label>
          <input
            type="date"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">End time</label>
          <input
            type="date"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter event location"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Limit Number</label>
          <input
            type="number"
            name="limitNumber"
            value={formData.limitNumber}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter participant limit"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Deadline Cancel</label>
          <input
            type="date"
            name="deadlineCancel"
            value={formData.deadlineCancel}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="academic">Academic</option>
            <option value="cultural">Cultural</option>
            <option value="sport">Sport</option>
            <option value="community">Community</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="form-section">
        <div className="form-row">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
            rows="15"
            placeholder="Enter detailed event description..."
          />
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="form-section">
        <div className="form-row">
          <label className="form-label">Email Template</label>
          <textarea
            name="emailTemplate"
            value={formData.emailTemplate}
            onChange={handleInputChange}
            className="form-textarea"
            rows="15"
            placeholder="Enter email template for participants..."
          />
        </div>
      </div>
    </>
  );

  // Success message component
  if (showSuccessMessage) {
    return (
      <MainLayout>
        <div className="success-page">
          <div className="success-container">
            <div className="system-header">
              <h1 className="system-title">
                <span className="letter-e">E</span>VENT{" "}
                <span className="letter-m">M</span>ANAGEMENT{" "}
                <span className="letter-s">S</span>YSTEM
              </h1>
              <p className="system-subtitle">
                EVENT MANAGEMENT SYSTEM FOR STUDENTS
                <br />
                UNIVERSITY OF ECONOMICS AND LAW - VIETNAM NATIONAL UNIVERSITY,
                HO CHI MINH CITY
              </p>
            </div>

            <div className="success-card">
              <div className="success-icon">
                <FaCheck />
              </div>
              <p className="success-message">Created successfully</p>
            </div>

            <button className="back-button" onClick={handleBackToManage}>
              Back
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="create-event-page">
        <div className="create-event-container">
          <img
            style={{
              height: 50,
              width: "auto",
              display: "block",
              margin: "30px auto",
            }}
            src={enterEventDetails}
            alt="enter-event-details"
          />

          <div className="content-layout">
            {/* Left Side - Image Selector */}
            <div className="image-section">
              <ImageSelector
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
              />
            </div>

            {/* Right Side - Form */}
            <div className="form-container">
              {error && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    backgroundColor: "#f8d7da",
                    border: "1px solid #f5c6cb",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "20px",
                  }}
                >
                  {error}
                </div>
              )}

              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="button-section">
                {currentStep > 1 && (
                  <button
                    style={{
                      color: "#000",
                      background: "transparent",
                      border: "none",
                      padding: "15px 30px",
                    }}
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    className="next-btn"
                    onClick={handleNext}
                    disabled={isLoading}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="create-btn"
                    onClick={handleCreate}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>1</div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>2</div>
            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>3</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEventPage;
