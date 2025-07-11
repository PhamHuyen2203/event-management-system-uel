import React, { useState } from "react";
import { getEventImage } from "../assets/eventImages.js";
import "./EventImage.css";

const EventImage = ({
  event,
  alt,
  className = "",
  style = {},
  fallbackText = "Event Image",
}) => {
  const [imageError, setImageError] = useState(false);

  // Determine image source
  const getImageSource = () => {
    if (!event?.image) {
      // No image provided, use default local image
      return getEventImage("default");
    }

    if (typeof event.image === "string" && event.image.startsWith("http")) {
      // External URL
      return event.image;
    }

    // Assume it's already a local imported image
    return event.image;
  };

  const handleImageError = (e) => {
    setImageError(true);
    // Create SVG fallback
    e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18" fill="%23999">${encodeURIComponent(
      fallbackText
    )}</text></svg>`;
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <img
      src={getImageSource()}
      alt={alt || event?.title || "Event"}
      className={`event-image ${imageError ? "image-error" : ""} ${className}`}
      style={style}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
};

export default EventImage;
