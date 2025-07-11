import React from "react";
import { useNavigate } from "react-router-dom";
import EventImage from "./EventImage";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="event-card" onClick={handleClick}>
      <div className="event-image">
        <EventImage
          event={event}
          alt={event.title}
          fallbackText="Event Image"
        />
        {/* <div className="event-category">{event.category}</div> */}
      </div>
      <div className="event-content">
        <h3
          className="event-title"
          style={{
            textAlign: "left",
          }}
        >
          {event.title}
        </h3>
        <div className="event-details">
          <div className="event-organizer">
            <span className="detail-label">Đơn vị tổ chức:</span>
            <span className="detail-value">{event.organizer}</span>
          </div>
          <div className="event-date">
            <span className="detail-label">Thời gian:</span>
            <span className="detail-value">{event.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
