// Import all event images from assets folder
import event1 from "./events/event-1.png";
import event2 from "./events/event-2.png";
import event3 from "./events/event-3.png";
import event4 from "./events/event-4.png";
import event5 from "./events/event-5.png";
import event6 from "./events/event-6.png";
import event7 from "./events/event-7.png";
import event8 from "./events/event-8.png";

// Export event images object for easy access
export const eventImages = {
  1: event1,
  2: event2,
  3: event3,
  4: event4,
  5: event5,
  6: event6,
  7: event7,
  8: event8,
  // Fallback images for events without specific images
  default: event1,
};

// Export individual images
export { event1, event2, event3, event4, event5, event6, event7, event8 };

// Helper function to get image by event ID
export const getEventImage = (eventId) => {
  return eventImages[eventId] || eventImages.default;
};
