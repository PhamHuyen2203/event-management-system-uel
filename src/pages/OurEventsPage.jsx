import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import EventCard from "../components/EventCard";
import storageService from "../services/storageService";
import relationshipService from "../services/relationshipService";
import "./OurEventsPage.css";

const OurEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load events created by current organization
  useEffect(() => {
    const loadOurEvents = () => {
      try {
        if (user?.id) {
          console.log(
            "📋 Loading events for organization:",
            user.id,
            user.profile?.fullName
          );
          // ✅ Use ID-based relationship instead of name matching
          const orgEvents = relationshipService.getEventsByCreator(user.id);
          console.log("📋 Found organization events:", orgEvents.length);
          setEvents(orgEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error loading organization events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadOurEvents();
  }, [user]);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  // Group events by status
  const pendingEvents = filteredEvents.filter(
    (event) => event.status === "pending"
  );
  const approvedEvents = filteredEvents.filter(
    (event) => event.status === "approved"
  );
  const rejectedEvents = filteredEvents.filter(
    (event) => event.status === "rejected"
  );

  return (
    <MainLayout>
      <div className="our-events-page">
        <div className="our-events-container">
          {/* Header Section */}
          <div className="header-section">
            <h1 className="page-title">
              <span className="event-letter-o">O</span>UR{" "}
              <span className="event-letter-e">E</span>VENTS
            </h1>
            {/* <button className="create-event-btn" onClick={handleCreateEvent}>
              Create New Event
            </button> */}
          </div>

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
                  placeholder="Search your events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-message">
              <p>Đang tải sự kiện của bạn...</p>
            </div>
          ) : (
            <>
              {/* Event Statistics */}
              <div className="event-stats">
                <div className="stat-card approved">
                  <h3>{approvedEvents.length}</h3>
                  <p>Approved Events</p>
                </div>
                <div className="stat-card pending">
                  <h3>{pendingEvents.length}</h3>
                  <p>Pending Events</p>
                </div>
                <div className="stat-card rejected">
                  <h3>{rejectedEvents.length}</h3>
                  <p>Rejected Events</p>
                </div>
                <div className="stat-card total">
                  <h3>{events.length}</h3>
                  <p>Total Events</p>
                </div>
              </div>

              {/* Events Sections */}
              {pendingEvents.length > 0 && (
                <div className="events-section">
                  <h2 className="section-title">Pending Approval</h2>
                  <div className="events-list">
                    {pendingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="event-card-wrapper pending"
                      >
                        <EventCard event={event} />
                        <div className="event-status-badge pending">
                          Pending
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {approvedEvents.length > 0 && (
                <div className="events-section">
                  <h2 className="section-title">Approved Events</h2>
                  <div className="events-list">
                    {approvedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="event-card-wrapper approved"
                      >
                        <EventCard event={event} />
                        <div className="event-status-badge approved">
                          Approved
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rejectedEvents.length > 0 && (
                <div className="events-section">
                  <h2 className="section-title">Rejected Events</h2>
                  <div className="events-list">
                    {rejectedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="event-card-wrapper rejected"
                      >
                        <EventCard event={event} />
                        <div className="event-status-badge rejected">
                          Rejected
                          {event.rejectionReason && (
                            <div className="rejection-reason">
                              Reason: {event.rejectionReason}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredEvents.length === 0 && (
                <div className="no-events">
                  <p>
                    {searchQuery
                      ? `Không tìm thấy sự kiện nào phù hợp với từ khóa "${searchQuery}"`
                      : "Bạn chưa tạo sự kiện nào. Nhấp vào 'Create New Event' để bắt đầu!"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default OurEventsPage;
