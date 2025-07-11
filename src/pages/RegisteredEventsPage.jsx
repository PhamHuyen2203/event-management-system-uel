import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import EventCard from "../components/EventCard";
import { useAuth } from "../contexts/AuthContext";
import storageService from "../services/storageService";
import "./RegisteredEventsPage.css";

const RegisteredEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load registered events for current user
  useEffect(() => {
    const loadRegisteredEvents = () => {
      try {
        if (user?.id) {
          const userRegisteredEvents = storageService.getUserRegisteredEvents(
            user.id
          );
          setRegisteredEvents(userRegisteredEvents);
        } else {
          setRegisteredEvents([]);
        }
      } catch (error) {
        console.error("Error loading registered events:", error);
        setRegisteredEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadRegisteredEvents();
  }, [user]);

  const filteredEvents = registeredEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="registered-events-page">
        <div className="registered-events-container">
          {/* Search Section */}
          <div className="search-section">
            <div className="search-container">
              <div className="search-box">
                <svg
                  className="search-icon"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="currentColor"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Looking for registered events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="events-section">
            <h2 className="events-title">
              Your <span className="event-letter-e">E</span>VENTS
            </h2>

            <div className="events-list">
              {loading ? (
                <div
                  className="loading-message"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#666",
                  }}
                >
                  <p>Đang tải sự kiện đã đăng ký...</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              )}
            </div>

            {!loading && filteredEvents.length === 0 && (
              <div className="no-events">
                <p>
                  {searchQuery
                    ? `Không tìm thấy sự kiện nào phù hợp với từ khóa "${searchQuery}"`
                    : "Bạn chưa đăng ký sự kiện nào."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisteredEventsPage;
