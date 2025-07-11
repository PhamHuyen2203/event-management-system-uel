import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import ImageSelector from "../components/ImageSelector";
import storageService from "../services/storageService";
import relationshipService from "../services/relationshipService";
import { FaCheck } from "react-icons/fa";
import "./CreateEventPage.css"; // Reuse the same CSS

const AdjustEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [error, setError] = useState("");
  const [currentEvent, setCurrentEvent] = useState(null);

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

  // Load event data for editing
  useEffect(() => {
    const loadEventForEditing = () => {
      try {
        if (eventId) {
          const event = storageService.getEventById(eventId);
          if (event) {
            // ✅ Check if current user can edit this event using ID-based relationship
            console.log("🔍 Checking edit permission for event:", event.id);
            console.log("   Event createdBy:", event.createdBy);
            console.log("   Current user ID:", user?.id);
            console.log("   User role:", user?.role);

            if (event.createdBy === user?.id || user?.role === "union_office") {
              setCurrentEvent(event);
              setFormData({
                title: event.title || "",
                startTime: event.date || "",
                endTime: event.endDate || "",
                location: event.location || "",
                limitNumber: event.limitNumber?.toString() || "",
                deadlineCancel: event.deadlineCancel || "",
                description: event.description || "",
                emailTemplate: event.emailTemplate || "",
                category: event.category || "academic",
              });
              setSelectedImage(event.image || null);
            } else {
              setError("Bạn không có quyền chỉnh sửa sự kiện này");
            }
          } else {
            setError("Không tìm thấy sự kiện");
          }
        } else {
          setError("Thiếu ID sự kiện");
        }
      } catch (error) {
        console.error("Error loading event:", error);
        setError("Có lỗi xảy ra khi tải sự kiện");
      } finally {
        setLoadingEvent(false);
      }
    };

    loadEventForEditing();
  }, [eventId, user]);

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

  const handleUpdate = async () => {
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
      // Prepare updated event data
      const updatedEventData = {
        title: formData.title.trim(),
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
      };

      // Update event using StorageService with permission check
      const result = storageService.updateEvent(
        parseInt(eventId),
        updatedEventData,
        user?.id,
        user?.role
      );

      if (result.success) {
        // Save image if exists
        if (selectedImage) {
          storageService.saveEventImage(parseInt(eventId), selectedImage);
        }

        setShowSuccessMessage(true);
      } else {
        setError(result.message || "Có lỗi xảy ra khi cập nhật sự kiện");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Có lỗi xảy ra khi cập nhật sự kiện");
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
              <p className="success-message">Adjusted successfully</p>
            </div>

            <button className="back-button" onClick={handleBackToManage}>
              Back
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Loading state
  if (loadingEvent) {
    return (
      <MainLayout>
        <div className="create-event-page">
          <div
            className="create-event-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              color: "#666",
            }}
          >
            <p>Đang tải thông tin sự kiện...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state
  if (error && !currentEvent) {
    return (
      <MainLayout>
        <div className="create-event-page">
          <div
            className="create-event-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              color: "#dc3545",
              textAlign: "center",
            }}
          >
            <p>{error}</p>
            <button
              className="back-btn"
              onClick={() => navigate("/our-events")}
              style={{ marginTop: "20px" }}
            >
              Quay lại danh sách sự kiện
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
          <h1 className="page-title">ADJUST EVENT DETAILS</h1>

          {error && (
            <div
              className="error-message"
              style={{
                background: "#f8d7da",
                color: "#721c24",
                padding: "12px 20px",
                borderRadius: "5px",
                marginBottom: "20px",
                border: "1px solid #f5c6cb",
              }}
            >
              {error}
            </div>
          )}

          <div className="content-layout">
            {/* Left Side - Image Selector */}
            <div className="image-section">
              {/* <div className="image-upload-area">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Event preview"
                    className="image-preview"
                    onError={(e) => {
                      e.target.src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18" fill="%23999">Event Image</text></svg>';
                    }}
                  />
                ) : (
                  <div className="image-placeholder">
                    <div className="placeholder-content">
                      <span>Select Event Image</span>
                    </div>
                  </div>
                )}
              </div> */}

              <ImageSelector
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
              />
            </div>

            {/* Right Side - Form */}
            <div className="form-container">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="button-section">
                {currentStep > 1 && (
                  <button
                    className="back-btn"
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
                    onClick={handleUpdate}
                    disabled={isLoading}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading ? "Updating..." : "Update Event"}
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

export default AdjustEventPage;
