import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import storageService from "../services/storageService";
import "./RejectionFormPage.css";

const RejectionFormPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [rejectReason, setRejectReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setIsLoading(true);

    try {
      const result = storageService.rejectEvent(
        parseInt(eventId),
        rejectReason.trim(),
        user?.profile?.name || user?.username || "Union Office"
      );

      if (result.success) {
        // Navigate to a success page or back to evaluate events
        navigate("/evaluate-events");
      } else {
        alert("Có lỗi xảy ra khi từ chối sự kiện: " + result.message);
      }
    } catch (error) {
      console.error("Error rejecting event:", error);
      alert("Có lỗi xảy ra khi từ chối sự kiện");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="rejection-form-page">
      <div className="header-title">
        <h1>
          <span className="letter-e">E</span>VENT{" "}
          <span className="letter-m">M</span>ANAGEMENT{" "}
          <span className="letter-s">S</span>YSTEM
        </h1>
      </div>

      <div className="subtitle">
        <p>EVENT MANAGEMENT SYSTEM FOR STUDENTS</p>
        <p>
          UNIVERSITY OF ECONOMICS AND LAW - VIETNAM NATIONAL UNIVERSITY, HO CHI
          MINH CITY
        </p>
      </div>

      <div className="rejection-container">
        <div className="rejection-card">
          <div className="rejection-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#f44336" />
              <path
                d="M15 9l-6 6M9 9l6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="rejection-title">Rejected the event</h2>

          <div className="reason-input-container">
            <textarea
              className="reason-input"
              placeholder="Type reject reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="button-container">
        <button
          className="back-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        <button
          className="back-btn"
          onClick={handleBack}
          disabled={isLoading}
          style={{ backgroundColor: "#999" }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default RejectionFormPage;
