import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import storageService from "../services/storageService";
import relationshipService from "../services/relationshipService";
import "./ManageEventsPage.css";

const ManageEventsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [userEvents, setUserEvents] = useState([]);

  // Load events for current user (organization: approved events, union: all their events)
  useEffect(() => {
    if (
      user &&
      (user.role === "organization" || user.role === "union_office")
    ) {
      loadUserEvents();
    }
  }, [user]);

  const loadUserEvents = () => {
    try {
      console.log(
        "📋 Loading events for user:",
        user?.id,
        user?.profile?.fullName
      );

      // ✅ Use ID-based relationship instead of string comparison
      const userEvents = relationshipService.getEventsByCreator(user.id);

      // Filter by status based on user role
      const filteredEvents = userEvents.filter((event) => {
        if (user.role === "organization") {
          // For organizations: show only approved events
          return event.status === "approved";
        }
        if (user.role === "union_office") {
          // For union office: show all their events (no status filter)
          return true;
        }
        return false;
      });

      console.log("📋 Found events for user:", filteredEvents.length);
      setUserEvents(filteredEvents);
    } catch (error) {
      console.error("Error loading user events:", error);
      setUserEvents([]);
    }
  };

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  const handleAdjustEvent = () => {
    setActionType("adjust");
    setShowModal(true);
  };

  const handleQRCode = () => {
    setActionType("qr");
    setShowModal(true);
  };

  const handleViewReports = () => {
    setActionType("reports");
    setShowModal(true);
  };

  const handleEventSelect = (eventId) => {
    setShowModal(false);

    switch (actionType) {
      case "adjust":
        navigate(`/adjust-event?eventId=${eventId}`);
        break;
      case "qr":
        navigate(`/qr-code?eventId=${eventId}`);
        break;
      case "reports":
        navigate(`/view-reports?eventId=${eventId}`);
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setActionType("");
  };

  const getModalTitle = () => {
    switch (actionType) {
      case "adjust":
        return "Chọn sự kiện để điều chỉnh";
      case "qr":
        return "Chọn sự kiện để tạo QR Code";
      case "reports":
        return "Chọn sự kiện để xem báo cáo";
      default:
        return "Chọn sự kiện";
    }
  };

  return (
    <MainLayout>
      <div className="manage-events-page">
        <div className="manage-events-container">
          <div className="action-grid">
            <button
              className="action-button create-event"
              onClick={handleCreateEvent}
            >
              CREATE
              <br />
              EVENT
            </button>

            <button
              className="action-button adjust-event"
              onClick={handleAdjustEvent}
            >
              ADJUST
              <br />
              EVENT
            </button>

            <button className="action-button qr-code" onClick={handleQRCode}>
              QR CODE
            </button>

            <button
              className="action-button view-reports"
              onClick={handleViewReports}
            >
              VIEW
              <br />
              REPORTS
            </button>
          </div>

          {/* Event Selection Modal */}
          {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>{getModalTitle()}</h2>
                  <button className="close-btn" onClick={closeModal}>
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  {userEvents.length > 0 ? (
                    <div className="events-grid">
                      {userEvents.map((event) => (
                        <div
                          key={event.id}
                          className="event-card"
                          onClick={() => handleEventSelect(event.id)}
                        >
                          <div className="event-image">
                            <img
                              src={event.image}
                              alt={event.title}
                              onError={(e) => {
                                e.target.src =
                                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80"><rect width="100" height="80" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="12" fill="%23999">Event</text></svg>';
                              }}
                            />
                          </div>
                          <div className="event-info">
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-organizer">{event.organizer}</p>
                            <p className="event-date">{event.date}</p>
                            <span className="event-status approved">
                              Đã duyệt
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-events">
                      <p>Không có sự kiện nào khả dụng.</p>
                      <p>
                        {user.role === "organization"
                          ? "Vui lòng tạo sự kiện mới và chờ phê duyệt."
                          : "Vui lòng tạo sự kiện mới."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageEventsPage;
