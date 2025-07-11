import React, { useState } from "react";
import "./ImageSelector.css";

const ImageSelector = ({ selectedImage, onImageSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Available preset images
  const presetImages = [
    {
      name: "academic-conference.jpg",
      url: "/events/assets/academic-conference.jpg",
      title: "Academic Conference",
      category: "academic",
    },
    {
      name: "business-seminar.jpg",
      url: "/events/assets/business-seminar.jpg",
      title: "Business Seminar",
      category: "academic",
    },
    {
      name: "tech-workshop.jpg",
      url: "/events/assets/tech-workshop.jpg",
      title: "Tech Workshop",
      category: "academic",
    },
    {
      name: "cultural-festival.jpg",
      url: "/events/assets/cultural-festival.jpg",
      title: "Cultural Festival",
      category: "cultural",
    },
    {
      name: "art-exhibition.jpg",
      url: "/events/assets/art-exhibition.jpg",
      title: "Art Exhibition",
      category: "cultural",
    },
    {
      name: "music-concert.jpg",
      url: "/events/assets/music-concert.jpg",
      title: "Music Concert",
      category: "cultural",
    },
    {
      name: "sports-event.jpg",
      url: "/events/assets/sports-event.jpg",
      title: "Sports Event",
      category: "sport",
    },
    {
      name: "community-service.jpg",
      url: "/events/assets/community-service.jpg",
      title: "Community Service",
      category: "community",
    },
    {
      name: "volunteer-activity.jpg",
      url: "/events/assets/volunteer-activity.jpg",
      title: "Volunteer Activity",
      category: "community",
    },
    {
      name: "student-meeting.jpg",
      url: "/events/assets/student-meeting.jpg",
      title: "Student Meeting",
      category: "other",
    },
  ];

  const handleImageSelect = (image) => {
    onImageSelect(image.url);
    setIsExpanded(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        onImageSelect(base64String);
        setIsExpanded(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const getDisplayImage = () => {
    if (selectedImage) {
      // If it's a data URL (uploaded file), use it directly
      if (selectedImage.startsWith("data:")) {
        return selectedImage;
      }
      // If it's a preset URL, use it directly
      return selectedImage;
    }
    return null;
  };

  return (
    <div className="image-selector">
      <div className="current-image-display" onClick={handleFileUpload}>
        {getDisplayImage() ? (
          <img
            src={getDisplayImage()}
            alt="Selected event image"
            className="selected-image-preview"
          />
        ) : (
          <div className="no-image-placeholder">
            <span>No image selected</span>
          </div>
        )}
      </div>

      <div className="image-selector-controls">
        {/* <button
          type="button"
          className="toggle-selector-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Gallery" : "Choose from Gallery"}
        </button> */}

        <label
          className="upload-file-btn"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Upload Image (.png, .jpg)
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {isExpanded && (
        <div className="image-gallery">
          <h4>Select an Event Image:</h4>
          <div className="image-grid">
            {presetImages.map((image) => (
              <div
                key={image.name}
                className={`image-option ${
                  selectedImage === image.url ? "selected" : ""
                }`}
                onClick={() => handleImageSelect(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="gallery-image"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="14" fill="%23999">Image</text></svg>';
                  }}
                />
                <div className="image-info">
                  <span className="image-title">{image.title}</span>
                  <span className="image-category">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
