import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import EventCard from "../components/EventCard";
import storageService from "../services/storageService";
import "./UserDashboardPage.css";
import bannerUEL from "../assets/banner.png";

const UserDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  // Load events from StorageService
  useEffect(() => {
    const loadEvents = () => {
      try {
        const allEvents = storageService.getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Determine which events to show based on route and user role
  const getEventsToShow = () => {
    // If accessing from /evaluate-events and user is union office, show pending events
    if (
      location.pathname === "/evaluate-events" &&
      user?.role === "union_office"
    ) {
      return events.filter((event) => event.status === "pending");
    }
    // Otherwise, show only approved events (default behavior)
    return events.filter((event) => event.status === "approved");
  };

  // Filter events based on role/route and then apply search filter
  const filteredEvents = getEventsToShow().filter(
    (event) =>
      event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event?.organizer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="event-home-main">
        {/* Banner Section - Hidden for union office on evaluate events page */}
        {!(
          location.pathname === "/evaluate-events" &&
          user?.role === "union_office"
        ) && (
          <div className="banner-section">
            <div className="banner-image">
              <img src={bannerUEL} alt="UEL Sports Complex" />
              <div className="banner-overlay"></div>
            </div>
          </div>
        )}

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
                placeholder="Looking for events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="events-section">
          <div className="events-container">
            <h2 className="events-title">
              {location.pathname === "/evaluate-events" &&
              user?.role === "union_office" ? (
                <>
                  <span className="event-letter-e">P</span>ENDING{" "}
                  <span className="event-letter-e">E</span>VENTS
                </>
              ) : (
                <>
                  <span className="event-letter-e">E</span>VENT
                </>
              )}
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
                  <p>Đang tải sự kiện...</p>
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
                    : location.pathname === "/evaluate-events" &&
                      user?.role === "union_office"
                    ? "Không có sự kiện nào đang chờ duyệt"
                    : "Không có sự kiện nào"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboardPage;
