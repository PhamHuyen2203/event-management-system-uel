import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import storageService from "../services/storageService";
import "./ViewReportsPage.css";

const ViewReportsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get("eventId");
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    if (eventId) {
      try {
        const eventData = storageService.getEventById(eventId);
        if (eventData) {
          setEvent(eventData);
          // Load registrations for this event
          const allRegistrations = storageService?.getUserRegistrations() || [];
          const eventRegistrations = allRegistrations.filter(
            (reg) => reg.eventId === parseInt(eventId)
          );
          setRegistrations(eventRegistrations);
        }
      } catch (error) {
        console.error("Error loading event data:", error);
      }
    }
  }, [eventId]);

  return (
    <MainLayout>
      <div className="reports-page">
        <div className="reports-container">
          <h1 className="page-title">VIEW REPORTS</h1>

          {event ? (
            <div className="reports-form-card">
              <div className="reports-form-content">
                <div className="reports-preview">
                  {event && event.image ? (
                    <div
                      className="event-image-preview"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        }}
                        onError={(e) => {
                          e.target.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18" fill="%23999">Event Image</text></svg>';
                        }}
                      />
                      <div
                        className="image-overlay"
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "0",
                          right: "0",
                          background:
                            "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          padding: "20px 15px 15px 15px",
                          borderRadius: "0 0 12px 12px",
                        }}
                      >
                        <h4
                          style={{
                            color: "white",
                            margin: "10px 0 5px 0",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                          }}
                        >
                          {event.title}
                        </h4>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.9)",
                            margin: "0",
                            fontSize: "0.9rem",
                          }}
                        >
                          {event.organizer} • {event.date}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="event-stats-card">
                      <div className="stats-header">
                        <div className="uel-logo">UEL 75</div>
                        <div className="event-info">
                          <h3>BÁO CÁO SỰ KIỆN</h3>
                          <h2>{event.title}</h2>
                          <p>Thời gian: {event.date}</p>
                          <p>
                            Địa điểm:{" "}
                            {event.location || "Trường Đại học Kinh tế - Luật"}
                          </p>
                          <p>Đơn vị tổ chức: {event.organizer}</p>
                        </div>
                      </div>
                      <div className="stats-chart">{registrations.length}</div>
                      <div className="additional-info">
                        <p>Tổng số đăng ký: {registrations.length} người</p>
                        <p>
                          Trạng thái:{" "}
                          {event.status === "approved"
                            ? "Đã duyệt"
                            : event.status === "pending"
                            ? "Chờ duyệt"
                            : "Từ chối"}
                        </p>
                      </div>
                    </div>
                  )}
                  <h3 className="event-title">{event.title}</h3>
                </div>

                <div className="reports-details">
                  <button
                    onClick={() =>
                      navigate(`/registration-list?eventId=${eventId}`)
                    }
                    style={{
                      marginBottom: "15px",
                      background: "#FF8030",
                      width: "250px",
                      color: "white",
                    }}
                  >
                    Registration list
                  </button>

                  <button
                    style={{
                      marginBottom: "15px",
                      background: "#FF8030",
                      width: "250px",
                      color: "white",
                    }}
                    onClick={() =>
                      navigate(`/list-of-participants?eventId=${eventId}`)
                    }
                  >
                    List of participants
                  </button>
                </div>
              </div>
            </div>
          ) : eventId ? (
            <div className="no-event-message">
              <p>Không tìm thấy sự kiện với ID: {eventId}</p>
            </div>
          ) : (
            <div className="no-event-message">
              <p>Vui lòng chọn một sự kiện để xem báo cáo.</p>
            </div>
          )}

          <button className="back-link" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewReportsPage;
