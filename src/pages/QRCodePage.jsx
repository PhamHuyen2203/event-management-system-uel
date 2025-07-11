import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QRCode from "qrcode";
import MainLayout from "../components/MainLayout";
import storageService from "../services/storageService";
import relationshipService from "../services/relationshipService";
import { useAuth } from "../contexts/AuthContext";
import "./QRCodePage.css";

const QRCodePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [step, setStep] = useState(1); // 1 = form, 2 = generated QR
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    codeType: "Check-in QR Code",
    startTime: "8:00 AM",
    endTime: "11:00 AM",
    feedbackUrl: "https://forms.gle/WM4yTBg1qiWf2AXv5",
  });

  // Load event data if eventId is provided
  useEffect(() => {
    if (eventId) {
      try {
        const eventData = storageService.getEventById(eventId);
        if (eventData) {
          setEvent(eventData);
          // Pre-fill form with event data
          setFormData((prev) => ({
            ...prev,
            startTime: eventData.date || prev.startTime,
            endTime: eventData.endDate || prev.endTime,
          }));
        }
      } catch (error) {
        console.error("Error loading event for QR:", error);
      }
    }
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateEventQRData = () => {
    if (event) {
      // ✅ Tối ưu QR data - chỉ giữ thông tin cần thiết để URL ngắn hơn
      const qrData = {
        // Essential Event Information Only
        id: event.id,
        title:
          event.title.length > 50
            ? event.title.substring(0, 50) + "..."
            : event.title,
        organizer: event.organizer,
        date: event.date,
        location: event.location
          ? event.location.length > 30
            ? "UEL Campus"
            : event.location
          : "UEL Campus",

        // QR Specific Info (minimal)
        type: formData.codeType.includes("Check-in")
          ? "checkin"
          : formData.codeType.includes("Feedback")
          ? "feedback"
          : "info",
        startTime: formData.startTime,
        endTime: formData.endTime,

        // Shortened URLs
        eventUrl: `${window.location.origin}/event/${event.id}`,
        feedbackUrl: formData.feedbackUrl,

        // Minimal meta
        v: "1.0",
        ts: Date.now(),
      };

      console.log("📱 Optimized QR data:", qrData);

      // Create the demo URL
      const demoUrl = `${
        window.location.origin
      }/qr-demo?data=${encodeURIComponent(JSON.stringify(qrData))}`;

      console.log("📱 QR URL length:", demoUrl.length, "characters");

      // Cảnh báo nếu URL quá dài
      if (demoUrl.length > 1500) {
        console.warn(
          "⚠️ QR URL might be too long for reliable scanning:",
          demoUrl.length,
          "characters"
        );
      }

      return demoUrl;
    } else {
      // Fallback cho trường hợp không có event data
      console.warn("⚠️ No event data available, using fallback QR");
      return `${window.location.origin}/qr-demo?id=${eventId || "demo"}`;
    }
  };

  const handleCreate = async () => {
    try {
      // Tạo QR URL với thông tin event thực tế
      const qrUrl = generateEventQRData();

      console.log("📱 Creating QR code for URL:", qrUrl);
      console.log("📱 URL length:", qrUrl.length, "characters");

      // Tạo QR code với URL string (không phải object)
      const qrCodeDataUrl = await QRCode.toDataURL(qrUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "M", // Thêm error correction để QR đọc tốt hơn
      });

      setQrCodeDataURL(qrCodeDataUrl);
      setStep(2);
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Có lỗi xảy ra khi tạo QR code");
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  const handleDownload = () => {
    if (qrCodeDataURL) {
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = qrCodeDataURL;
      link.click();
    }
  };

  if (step === 1) {
    return (
      <MainLayout>
        <div className="qr-page">
          <div className="qr-container">
            <h1 className="page-title">CREATE QR CODE</h1>

            <div className="qr-form-card">
              <div className="qr-form-content">
                <div className="qr-preview">
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
                    <div className="sample-qr">
                      <div className="sample-header">
                        <div className="uel-logo">UEL 75</div>
                        <div className="event-info">
                          <h3>ĐĂNG KÝ THAM GIA SỰ KIỆN</h3>
                          <h2>
                            {event
                              ? event.title
                              : "NGÀY KHÔNG TIỀN MẶT - TING TING DAY"}
                          </h2>
                          <p>
                            Thời gian: {formData.startTime}, ngày{" "}
                            {event ? event.date : "14/6/2025"}
                          </p>
                          <p>
                            Địa điểm:{" "}
                            {event ? event.location : "Đường số Bộ Nguyễn Huệ"}
                          </p>
                          {event && <p>Đơn vị tổ chức: {event.organizer}</p>}
                        </div>
                      </div>
                      <div className="qr-code-small"></div>
                      <div className="additional-info">
                        <p>Thông tin chi tiết</p>
                        <p>
                          {event
                            ? `Sự kiện thuộc danh mục ${event.category}. Sinh viên tham gia sẽ được ghi nhận điểm rèn luyện.`
                            : "Sinh viên tham gia Lễ hội được ghi nhận đủ điểm rèn luyện và tặng kỷ niệm cho sinh viên tham gia năm học 2024 - 2025 theo quy định tại mục 2.4."}
                        </p>
                      </div>
                    </div>
                  )}
                  <h3 className="event-title">
                    {event
                      ? event.title
                      : 'LỄ HỘI "NGÀY KHÔNG TIỀN MẶT - TING TING DAY"'}
                  </h3>
                </div>

                <div className="qr-form">
                  <div className="form-group">
                    <label>Code Type</label>
                    <select
                      name="codeType"
                      value={formData.codeType}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option>QR Code Type</option>
                      <option>Check-in QR Code</option>
                      <option>Event Info QR Code</option>
                      <option>Feedback QR Code</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="text"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="text"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Event feedback form URL</label>
                    <input
                      type="url"
                      name="feedbackUrl"
                      value={formData.feedbackUrl}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <button className="create-btn" onClick={handleCreate}>
                    Create
                  </button>
                </div>
              </div>
            </div>

            <button className="back-link" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="qr-page">
        <div className="qr-container">
          <h1 className="page-title">CREATE QR CODE</h1>

          <div className="qr-result-card">
            <div className="generated-qr">
              {qrCodeDataURL ? (
                <img
                  src={qrCodeDataURL}
                  alt="Generated QR Code"
                  className="qr-code-image"
                />
              ) : (
                <div className="qr-code-large"></div>
              )}
              <p className="qr-label">QR CODE CHECK IN</p>
              <button className="download-btn" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>

          <button className="back-link" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default QRCodePage;
