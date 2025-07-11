import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import storageService from "../services/storageService";
import relationshipService from "../services/relationshipService";
import "./RegistrationListPage.css";

const RegistrationListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get("eventId");
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  // Fake data for participants
  const generateFakeParticipants = (eventId) => {
    const fakeNames = [
      {
        lastName: "Nguyễn Văn",
        firstName: "An",
        birthDate: "15/03/2002",
        class: "22DTHA1",
        studentId: "22DTHA1",
      },
      {
        lastName: "Trần Thị",
        firstName: "Bình",
        birthDate: "20/08/2003",
        class: "22DTHA2",
        studentId: "22DTHA2",
      },
      {
        lastName: "Lê Minh",
        firstName: "Cường",
        birthDate: "10/12/2002",
        class: "22DTHB1",
        studentId: "22DTHB1",
      },
      {
        lastName: "Phạm Thị",
        firstName: "Dung",
        birthDate: "05/07/2003",
        class: "22DTHB2",
        studentId: "22DTHB2",
      },
      {
        lastName: "Hoàng Văn",
        firstName: "Em",
        birthDate: "25/01/2002",
        class: "22DTHA3",
        studentId: "22DTHA3",
      },
      {
        lastName: "Võ Thị",
        firstName: "Hoa",
        birthDate: "18/11/2003",
        class: "22DTHC1",
        studentId: "22DTHC1",
      },
      {
        lastName: "Đặng Minh",
        firstName: "Khôi",
        birthDate: "30/06/2002",
        class: "22DTHC2",
        studentId: "22DTHC2",
      },
      {
        lastName: "Bùi Thị",
        firstName: "Lan",
        birthDate: "12/09/2003",
        class: "22DTHA4",
        studentId: "22DTHA4",
      },
      {
        lastName: "Đinh Văn",
        firstName: "Nam",
        birthDate: "08/04/2002",
        class: "22DTHD1",
        studentId: "22DTHD1",
      },
      {
        lastName: "Lý Thị",
        firstName: "Oanh",
        birthDate: "22/10/2003",
        class: "22DTHD2",
        studentId: "22DTHD2",
      },
      {
        lastName: "Trương Minh",
        firstName: "Phúc",
        birthDate: "14/02/2002",
        class: "22DTHE1",
        studentId: "22DTHE1",
      },
      {
        lastName: "Phan Thị",
        firstName: "Quỳnh",
        birthDate: "27/05/2003",
        class: "22DTHE2",
        studentId: "22DTHE2",
      },
      {
        lastName: "Dương Văn",
        firstName: "Sơn",
        birthDate: "03/12/2002",
        class: "22DTHF1",
        studentId: "22DTHF1",
      },
      {
        lastName: "Ngô Thị",
        firstName: "Trang",
        birthDate: "16/08/2003",
        class: "22DTHF2",
        studentId: "22DTHF2",
      },
      {
        lastName: "Hồ Minh",
        firstName: "Tuấn",
        birthDate: "09/01/2002",
        class: "22DTHG1",
        studentId: "22DTHG1",
      },
      {
        lastName: "Vũ Thị",
        firstName: "Uyên",
        birthDate: "24/07/2003",
        class: "22DTHG2",
        studentId: "22DTHG2",
      },
      {
        lastName: "Mai Văn",
        firstName: "Vinh",
        birthDate: "11/03/2002",
        class: "22DTHH1",
        studentId: "22DTHH1",
      },
      {
        lastName: "Chu Thị",
        firstName: "Xuân",
        birthDate: "28/09/2003",
        class: "22DTHH2",
        studentId: "22DTHH2",
      },
      {
        lastName: "Lưu Minh",
        firstName: "Yến",
        birthDate: "06/11/2002",
        class: "22DTHI1",
        studentId: "22DTHI1",
      },
      {
        lastName: "Tô Văn",
        firstName: "Đức",
        birthDate: "19/04/2003",
        class: "22DTHI2",
        studentId: "22DTHI2",
      },
    ];

    // Generate random number of participants (8-15 people)
    const numParticipants = Math.floor(Math.random() * 8) + 8;
    const selectedParticipants = [];

    for (let i = 0; i < numParticipants; i++) {
      const randomIndex = Math.floor(Math.random() * fakeNames.length);
      const participant = { ...fakeNames[randomIndex] };
      // Ensure unique participants by adding index if duplicate
      if (
        selectedParticipants.some(
          (p) =>
            p.lastName === participant.lastName &&
            p.firstName === participant.firstName
        )
      ) {
        participant.firstName += ` ${i + 1}`;
      }
      selectedParticipants.push(participant);
    }

    return selectedParticipants;
  };

  useEffect(() => {
    if (eventId) {
      try {
        const eventData = storageService.getEventById(eventId);
        if (eventData) {
          setEvent(eventData);
          // Get real participants data instead of fake data
          const realParticipants =
            relationshipService.getRealEventParticipants(eventId);
          console.log(
            "Real participants for event",
            eventId,
            ":",
            realParticipants
          );
          setRegistrations(realParticipants);
        }
      } catch (error) {
        console.error("Error loading event data:", error);
      }
    }
  }, [eventId]);

  return (
    <MainLayout>
      <div className="registration-list-page">
        <div className="registration-list-container">
          {event ? (
            <div className="registration-list-card">
              <div className="registration-list-content">
                {/* Left Column - Event Image and Info */}
                <div className="event-preview">
                  <div
                    className="event-image-container"
                    style={{
                      marginBottom: "0px",
                    }}
                  >
                    <img
                      style={{
                        boxShadow: "none",
                        borderRadius: "30px",
                      }}
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18" fill="%23999">Event Image</text></svg>';
                      }}
                    />
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                  </div>
                </div>

                {/* Right Column - Participants Table */}
                <div className="participants-section">
                  <h2
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                    className="page-title"
                  >
                    Registration List
                  </h2>

                  {registrations.length > 0 ? (
                    <div className="table-container">
                      <table className="participants-table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Họ lót</th>
                            <th>Tên</th>
                            <th>Ngày sinh</th>
                            <th>Lớp</th>
                            <th>Ghi chú</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registrations.map((participant, index) => (
                            <tr key={participant.id || index}>
                              <td>{index + 1}</td>
                              <td>{participant.studentId}</td>
                              <td>{participant.lastName}</td>
                              <td>{participant.firstName}</td>
                              <td>{participant.birthDate}</td>
                              <td>{participant.class}</td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-registrations">
                      <p>Chưa có ai đăng ký tham gia sự kiện này.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="action-buttons">
                <button
                  style={{
                    background: "none ",
                    width: "250px",
                    color: "#315088",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Quay lại
                </button>
              </div>
            </div>
          ) : eventId ? (
            <div className="no-event-message">
              <p>Không tìm thấy sự kiện với ID: {eventId}</p>
            </div>
          ) : (
            <div className="no-event-message">
              <p>Vui lòng chọn một sự kiện để xem danh sách đăng ký.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default RegistrationListPage;
