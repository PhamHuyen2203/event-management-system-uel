import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import EventCard from "../components/EventCard";
import storageService from "../services/storageService";
import "./UELEventsPage.css";
import { eventData, categoryLabels } from "../data/eventData";

const UELEventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load events from StorageService
  useEffect(() => {
    const loadEvents = () => {
      try {
        // Only show approved events on public page
        const approvedEvents = storageService.getEventsByStatus("approved");
        setEvents(approvedEvents);
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="uel-events-page">
        <div className="uel-events-container">
          {/* Search & Filter Section */}
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

              {/* Category Filter */}
              <div className="category-filter">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    className={`category-btn ${
                      selectedCategory === key ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="events-section">
            <h2 className="events-title">
              <span className="event-letter-e">E</span>VENT
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
                    : "Không có sự kiện nào được phê duyệt"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UELEventsPage;
