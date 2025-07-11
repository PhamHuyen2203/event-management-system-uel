import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import storageService from "../services/storageService";
import "./EventDetailPage.css";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);

  // Load event from StorageService
  useEffect(() => {
    const loadEvent = () => {
      try {
        const eventData = storageService.getEventById(id);
        setEvent(eventData);

        // Check if user is registered for this event
        if (user?.id && eventData) {
          const registered = storageService.isUserRegisteredForEvent(
            user.id,
            eventData.id
          );
          setIsRegistered(registered);
        }
      } catch (error) {
        console.error("Error loading event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEvent();
    }
  }, [id, user]);

  const handleApprove = () => {
    const result = storageService.approveEvent(
      parseInt(id),
      user?.profile?.name || user?.username || "Union Office"
    );

    if (result.success) {
      navigate("/approval-success");
    } else {
      alert("Có lỗi xảy ra khi phê duyệt sự kiện: " + result.message);
    }
  };

  const handleReject = () => {
    navigate(`/rejection-form?eventId=${id}`);
  };

  const handleRegister = async () => {
    if (!user?.id) {
      alert("Vui lòng đăng nhập để đăng ký sự kiện");
      return;
    }

    setRegistrationLoading(true);

    try {
      const result = storageService.registerUserForEvent(user.id, parseInt(id));

      if (result.success) {
        setIsRegistered(true);
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Có lỗi xảy ra khi đăng ký sự kiện");
    } finally {
      setRegistrationLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      return;
    }

    try {
      const result = storageService.deleteEvent(
        parseInt(id),
        user?.id,
        user?.role
      );
      if (result.success) {
        alert("Đã xóa sự kiện thành công");
        navigate("/our-events");
      } else {
        alert("Có lỗi xảy ra khi xóa sự kiện: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Có lỗi xảy ra khi xóa sự kiện");
    }
  };

  const handleAdjustEvent = () => {
    navigate(`/adjust-event?eventId=${id}`);
  };

  const handleCreateQRCode = () => {
    navigate(`/qr-code?eventId=${id}`);
  };

  const handleViewReport = () => {
    navigate(`/view-reports?eventId=${id}`);
  };

  // Check if current organization created this event
  const isEventCreatedByCurrentOrg = () => {
    if (!user || !event) return false;

    // Only organizations and unions can create/manage events, but unions only manage their own
    if (user.role === "union_office") {
      // Union can only manage events they created themselves
      return event.createdBy === user.id;
    }

    if (user.role === "organization") {
      // First check by createdBy ID (most reliable)
      if (event.createdBy === user.id) {
        return true;
      }

      // Fallback: check by organizer name for backward compatibility
      const userOrgNames = [
        user.profile.name,
        user.profile.fullName,
        user.profile.organizationName, // legacy field
      ].filter(Boolean);

      // Check exact match first
      if (userOrgNames.some((name) => name === event.organizer)) {
        return true;
      }

      // Check case-insensitive partial match for similar names
      const eventOrgLower = event.organizer
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      return userOrgNames.some((name) => {
        const nameLower = name.toLowerCase().replace(/\s+/g, " ").trim();
        // Check if names contain similar keywords
        return (
          nameLower.includes(eventOrgLower) ||
          eventOrgLower.includes(nameLower) ||
          (nameLower.includes("đoàn") && eventOrgLower.includes("đoàn")) ||
          (nameLower.includes("khoa") &&
            eventOrgLower.includes("khoa") &&
            (nameLower.includes("thông tin") ||
              eventOrgLower.includes("thông tin")))
        );
      });
    }

    return false;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="event-detail-page">
          <div
            className="event-not-found"
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
            }}
          >
            <p>Đang tải thông tin sự kiện...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!event) {
    return (
      <MainLayout>
        <div className="event-detail-page">
          <div className="event-not-found">
            <h2>Event not found</h2>
            <button onClick={() => navigate(-1)} className="back-btn">
              Go Back
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="event-detail-page">
        <div className="event-detail-container">
          <h1 className="detail-title">
            <span className="detail-letter-d">D</span>ETAILS{" "}
            <span className="detail-letter-e">E</span>VENT
          </h1>

          <div className="event-detail-content">
            {/* Left side - Event Image */}
            <div className="event-detail-image">
              <img
                src={event.image}
                alt={event.title}
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18" fill="%23999">Event Image</text></svg>';
                }}
              />
              {/* Union office: ONLY approval buttons for pending events */}
              {user?.role === "union_office" && event.status === "pending" ? (
                <div className="union-action-buttons">
                  <button className="approve-btn" onClick={handleApprove}>
                    Approve
                  </button>
                  <button className="reject-btn" onClick={handleReject}>
                    Reject
                  </button>
                </div>
              ) : isEventCreatedByCurrentOrg() ? (
                // Event management buttons only for creators (organizations or unions that created the event)
                <div className="union-action-buttons">
                  <button className="approve-btn" onClick={handleAdjustEvent}>
                    Adjust Event
                  </button>
                  <button className="approve-btn" onClick={handleCreateQRCode}>
                    Create QR Code
                  </button>
                  <button className="approve-btn" onClick={handleViewReport}>
                    View Report
                  </button>
                  <button className="reject-btn" onClick={handleDeleteEvent}>
                    Delete Event
                  </button>
                </div>
              ) : user?.role === "student" ? (
                // Students can register or see registered status
                isRegistered ? (
                  <button
                    className="register-btn"
                    disabled={true}
                    style={{
                      backgroundColor: "#ccc",
                      cursor: "not-allowed",
                      opacity: 0.8,
                    }}
                  >
                    Registered
                  </button>
                ) : (
                  <button
                    className="register-btn"
                    onClick={handleRegister}
                    disabled={registrationLoading}
                  >
                    {registrationLoading ? "Processing..." : "Register Now"}
                  </button>
                )
              ) : null}
            </div>

            {/* Right side - Event Details */}
            <div className="event-detail-info">
              <h2 className="event-detail-title">{event.title}</h2>

              <div className="event-description">
                <p>
                  Đây là một sự kiện quan trọng do {event.organizer} tổ chức. Sự
                  kiện mang đến cho sinh viên cơ hội học hỏi, giao lưu và phát
                  triển kỹ năng trong lĩnh vực {event.category}. Với nội dung
                  phong phú và chất lượng cao, đây sẽ là trải nghiệm bổ ích cho
                  tất cả người tham gia.
                </p>

                <p>
                  Chương trình được thiết kế để mang lại kiến thức thực tiễn và
                  kỹ năng cần thiết cho sinh viên. Thông qua các hoạt động đa
                  dạng, người tham gia sẽ có cơ hội kết nối với các chuyên gia
                  và đồng nghiệp trong ngành.
                </p>
              </div>

              <div className="event-info-section">
                <h3>ĐỐI TƯỢNG THAM GIA:</h3>
                <p>
                  Tất cả sinh viên đang theo học tại các Trường Đại học, Học
                  viện, Cao đẳng trên toàn quốc.
                </p>
              </div>

              <div className="event-info-section">
                <h3>LỆ PHÍ THAM GIA:</h3>
                <p>Miễn phí.</p>
              </div>

              <div className="event-info-section">
                <h3>CÁCH THỨC ĐĂNG KÝ:</h3>
                <p>Chi tiết tại Website sự kiện.</p>
              </div>

              <div className="event-info-section">
                <h3>THỜI GIAN - ĐỊA ĐIỂM</h3>
                <div className="time-location">
                  <p>
                    <strong>Thời gian:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Hình thức:</strong> Online
                  </p>
                  <p>
                    <strong>Địa điểm:</strong> Trực tiếp tại Trường Đại học Kinh
                    tế - Luật
                  </p>
                </div>
              </div>

              <div className="event-info-section">
                <h3>THÔNG TIN LIÊN HỆ</h3>
                <div className="contact-info">
                  <p>
                    <strong>Đơn vị tổ chức:</strong> {event.organizer}
                  </p>
                  <p>
                    <strong>Email:</strong> events@uel.edu.vn
                  </p>
                  <p>
                    <strong>Phone:</strong> 028 37244539
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetailPage;
