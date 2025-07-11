import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import "./ApprovalSuccessPage.css";

const ApprovalSuccessPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Replace current history entry to prevent going back to previous page
    window.history.replaceState(null, "", window.location.pathname);

    // Add a new history entry to prevent back navigation
    window.history.pushState(null, "", window.location.pathname);

    const handlePopState = (event) => {
      // Prevent going back by pushing the same state again
      window.history.pushState(null, "", window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Get message and back path from URL params
  const message = searchParams.get("message") || "Event approved successfully";
  const backPath = searchParams.get("backPath") || getDefaultBackPath();

  function getDefaultBackPath() {
    if (user?.role === "union_office") {
      return "/evaluate-events";
    } else if (user?.role === "organization") {
      return "/manage-events";
    } else {
      return "/dashboard";
    }
  }

  const handleBack = () => {
    // Navigate to the specified back path
    navigate(backPath, { replace: true });
  };

  return (
    <MainLayout>
      <div className="approval-success-page">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="success-message">{message}</h2>
          </div>
        </div>

        <div className="back-button-container">
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApprovalSuccessPage;
