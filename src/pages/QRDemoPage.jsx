import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./QRDemoPage.css";

const QRDemoPage = () => {
  const [searchParams] = useSearchParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("📱 QRDemoPage: Loading QR data...");

    // Try to get event data from URL params
    const qrData = searchParams.get("data");
    const idParam = searchParams.get("id");

    if (qrData) {
      try {
        console.log("📱 Raw QR data length:", qrData.length);
        const parsedData = JSON.parse(decodeURIComponent(qrData));
        console.log("📱 Parsed QR data:", parsedData);

        // Normalize data để tương thích với format mới và cũ
        const normalizedData = {
          eventTitle:
            parsedData.title || parsedData.eventTitle || "Unnamed Event",
          eventId: parsedData.id || parsedData.eventId,
          organizer: parsedData.organizer || "Unknown Organizer",
          date: parsedData.date,
          endDate: parsedData.endDate,
          location: parsedData.location || "UEL Campus",
          category: parsedData.category || "general",

          // Convert short type back to full description
          type:
            parsedData.type === "checkin"
              ? "Check-in QR Code"
              : parsedData.type === "feedback"
              ? "Feedback QR Code"
              : parsedData.type === "info"
              ? "Event Info QR Code"
              : parsedData.type || "Check-in QR Code",

          startTime: parsedData.startTime || "8:00 AM",
          endTime: parsedData.endTime || "11:00 AM",
          eventUrl: parsedData.eventUrl,
          feedbackUrl: parsedData.feedbackUrl,

          // Handle timestamp
          generatedAt: parsedData.ts
            ? new Date(parsedData.ts).toLocaleString("vi-VN")
            : parsedData.generatedAt,
          version: parsedData.v || parsedData.version || "1.0",

          // Keep creator info if available
          creatorInfo: parsedData.creatorInfo,
        };

        console.log("📱 Normalized QR data:", normalizedData);

        // Validate required fields
        if (
          !normalizedData.eventTitle ||
          normalizedData.eventTitle === "Unnamed Event"
        ) {
          throw new Error("Missing or invalid event title in QR data");
        }

        setEventData(normalizedData);
        setError("");
      } catch (error) {
        console.error("❌ Error parsing QR data:", error);
        setError(
          "Không thể đọc dữ liệu QR Code. Dữ liệu có thể bị lỗi hoặc không hợp lệ."
        );

        // Fallback to demo data
        setEventData({
          eventTitle: "Lỗi đọc QR - Demo Event",
          organizer: "UEL Demo Organization",
          date: "2025-01-15",
          location: "Trường Đại học Kinh tế - Luật",
          category: "academic",
          type: "Demo QR Code",
          startTime: "8:00 AM",
          endTime: "11:00 AM",
          error: true,
        });
      }
    } else if (idParam && idParam !== "demo") {
      console.log("📱 Loading event by ID:", idParam);
      // Import here to avoid circular dependencies
      import("../services/storageService.js").then(
        ({ default: storageService }) => {
          try {
            const event = storageService.getEventById(parseInt(idParam));
            if (event) {
              setEventData({
                eventTitle: event.title,
                eventId: event.id,
                organizer: event.organizer,
                date: event.date,
                location: event.location || "UEL Campus",
                category: event.category || "general",
                type: "Event Info QR Code",
                eventUrl: `${window.location.origin}/event/${event.id}`,
              });
            } else {
              setError("Không tìm thấy sự kiện");
            }
          } catch (error) {
            console.error("❌ Failed to load event:", error);
            setError("Không thể tải thông tin sự kiện");
          }
          setLoading(false);
        }
      );
      return; // Early return to prevent setLoading(false) below
    } else {
      console.log("📱 No QR data found, using demo data");
      // Demo data for testing
      setEventData({
        eventTitle: "Demo Event - QR Code Test",
        organizer: "UEL Demo Organization",
        date: "2025-01-15",
        location: "Trường Đại học Kinh tế - Luật",
        category: "academic",
        type: "Demo QR Code",
        startTime: "8:00 AM",
        endTime: "11:00 AM",
        creatorInfo: {
          name: "Demo Creator",
          role: "organization",
          email: "demo@uel.edu.vn",
        },
        isDemo: true,
      });
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="qr-demo-page">
        <div className="loading">
          <div className="uel-logo">UEL</div>
          <p>📱 Đang tải thông tin sự kiện...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="qr-demo-page">
        <div className="error-container">
          <div className="uel-logo">UEL</div>
          <h2>❌ Lỗi QR Code</h2>
          <p>Không thể tải thông tin sự kiện từ QR Code.</p>
          <button className="demo-btn" onClick={() => window.history.back()}>
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-demo-page">
      <div className="qr-demo-container">
        <div className="demo-header">
          <div className="uel-logo">UEL</div>
          <h1>Thông tin sự kiện</h1>
        </div>

        <div className="event-info-card">
          {/* Status indicators */}
          {error && (
            <div className="status-banner error">
              ⚠️ Dữ liệu QR có thể không chính xác
            </div>
          )}
          {eventData.isDemo && (
            <div className="status-banner demo">🧪 Đây là dữ liệu demo</div>
          )}

          <h2 className="event-title">{eventData.eventTitle}</h2>

          {/* Basic Event Info */}
          <div className="info-section">
            <h3>📋 Thông tin sự kiện</h3>

            <div className="info-row">
              <span className="label">🏢 Đơn vị tổ chức:</span>
              <span className="value">{eventData.organizer}</span>
            </div>

            <div className="info-row">
              <span className="label">📅 Ngày bắt đầu:</span>
              <span className="value">{eventData.date}</span>
            </div>

            {eventData.endDate && (
              <div className="info-row">
                <span className="label">📅 Ngày kết thúc:</span>
                <span className="value">{eventData.endDate}</span>
              </div>
            )}

            <div className="info-row">
              <span className="label">⏰ Thời gian:</span>
              <span className="value">
                {eventData.startTime} - {eventData.endTime}
              </span>
            </div>

            <div className="info-row">
              <span className="label">📍 Địa điểm:</span>
              <span className="value">{eventData.location}</span>
            </div>

            <div className="info-row">
              <span className="label">🏷️ Danh mục:</span>
              <span className="value">{eventData.category}</span>
            </div>

            {eventData.description && (
              <div className="info-row">
                <span className="label">📝 Mô tả:</span>
                <span className="value description">
                  {eventData.description}
                </span>
              </div>
            )}
          </div>

          {/* Creator Information */}
          {eventData.creatorInfo && (
            <div className="info-section">
              <h3>👤 Thông tin người tạo</h3>

              <div className="info-row">
                <span className="label">👨‍💼 Tên:</span>
                <span className="value">{eventData.creatorInfo.name}</span>
              </div>

              <div className="info-row">
                <span className="label">🏛️ Vai trò:</span>
                <span className="value">
                  {eventData.creatorInfo.role === "organization"
                    ? "Tổ chức"
                    : eventData.creatorInfo.role === "union_office"
                    ? "Ban đoàn"
                    : eventData.creatorInfo.role}
                </span>
              </div>

              {eventData.creatorInfo.email && (
                <div className="info-row">
                  <span className="label">📧 Email:</span>
                  <span className="value">{eventData.creatorInfo.email}</span>
                </div>
              )}

              {eventData.creatorInfo.organization && (
                <div className="info-row">
                  <span className="label">🏢 Tổ chức:</span>
                  <span className="value">
                    {eventData.creatorInfo.organization}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* QR Information */}
          <div className="info-section">
            <h3>🔗 Thông tin QR Code</h3>

            <div className="info-row">
              <span className="label">📱 Loại QR:</span>
              <span className="value">{eventData.type}</span>
            </div>

            {eventData.generatedAt && (
              <div className="info-row">
                <span className="label">⏰ Tạo lúc:</span>
                <span className="value">
                  {new Date(eventData.generatedAt).toLocaleString("vi-VN")}
                </span>
              </div>
            )}

            {eventData.generatedBy && (
              <div className="info-row">
                <span className="label">👤 Tạo bởi:</span>
                <span className="value">{eventData.generatedBy}</span>
              </div>
            )}
          </div>
        </div>

        <div className="demo-footer">
          <p>✅ QR Code đã được quét thành công!</p>
          <p>📱 Thông tin được hiển thị trên thiết bị di động</p>
          {eventData.isDemo && (
            <p className="demo-note">
              🧪 Đây là chế độ demo - dữ liệu có thể không thật
            </p>
          )}
        </div>

        <div className="actions">
          <button className="demo-btn" onClick={() => window.history.back()}>
            Quay lại
          </button>

          {eventData.eventUrl && (
            <a
              href={eventData.eventUrl}
              className="demo-btn primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem chi tiết sự kiện
            </a>
          )}

          {eventData.feedbackUrl && (
            <a
              href={eventData.feedbackUrl}
              className="demo-btn secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Đánh giá sự kiện
            </a>
          )}

          {/* Check-in action for Check-in QR codes */}
          {eventData.type === "Check-in QR Code" && (
            <button
              className="demo-btn success"
              onClick={() => {
                alert("✅ Check-in thành công! (Demo)");
                console.log("📱 Check-in recorded for:", eventData.eventTitle);
              }}
            >
              Check-in ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRDemoPage;
