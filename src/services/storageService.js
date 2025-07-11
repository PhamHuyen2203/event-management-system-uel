import { eventData } from "../data/eventData.js";
import { mockUsers } from "../data/userData.js";

const STORAGE_KEYS = {
  EVENTS: "uel_events_data",
  USERS: "uel_users_data", // Sẽ chứa TẤT CẢ users (mock + registered)
  AUTH_USER: "uel_auth_user", // User hiện tại đang đăng nhập
  SESSION_TOKEN: "uel_session_token", // Session token
  REGISTRATIONS: "uel_registrations",
  EVENT_IMAGES: "uel_event_images",
};

class StorageService {
  constructor() {
    this.initializeStorage();
  }

  // New methods for relationship management
  updateAllUsers(users) {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return { success: true };
    } catch (error) {
      console.error("Error updating all users:", error);
      return { success: false, message: "Không thể cập nhật dữ liệu users" };
    }
  }

  updateAllEvents(events) {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
      return { success: true };
    } catch (error) {
      console.error("Error updating all events:", error);
      return { success: false, message: "Không thể cập nhật dữ liệu events" };
    }
  }

  getUserById(userId) {
    try {
      const users = this.getAllUsers();
      return users.find((user) => user.id === userId) || null;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return null;
    }
  }

  // Initialize storage with default data if not exists
  initializeStorage() {
    try {
      // Initialize events if not exists
      if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(eventData));
      }

      // Initialize users if not exists - bao gồm cả mockUsers
      if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
      }

      // Initialize registrations if not exists
      if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify({}));
      }

      // Initialize event images if not exists
      if (!localStorage.getItem(STORAGE_KEYS.EVENT_IMAGES)) {
        localStorage.setItem(STORAGE_KEYS.EVENT_IMAGES, JSON.stringify({}));
      }
    } catch (error) {
      console.error("Error initializing storage:", error);
    }
  }

  // Event Management Methods
  getAllEvents() {
    try {
      const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
      const rawEvents = events ? JSON.parse(events) : [];

      // Enrich events with organizer names from user relationships
      return this.enrichEventsWithOrganizerNames(rawEvents);
    } catch (error) {
      console.error("Error getting events:", error);
      return [];
    }
  }

  // Enrich events with organizer names based on createdBy ID
  enrichEventsWithOrganizerNames(events) {
    try {
      const users = this.getAllUsers();

      return events.map((event) => {
        if (event.createdBy && !event.organizer) {
          const creator = users.find((user) => user.id === event.createdBy);
          if (creator) {
            event.organizer =
              creator.profile?.fullName ||
              creator.profile?.name ||
              creator.username ||
              "Không xác định";
          }
        }
        return event;
      });
    } catch (error) {
      console.error("Error enriching events with organizer names:", error);
      return events;
    }
  }

  getEventById(id) {
    try {
      const events = this.getAllEvents(); // Already enriched with organizer names
      return events.find((event) => event.id === parseInt(id));
    } catch (error) {
      console.error("Error getting event by ID:", error);
      return null;
    }
  }

  createEvent(eventData, userRole) {
    try {
      const events = this.getAllEvents();
      const newId = Math.max(...events.map((e) => e.id), 0) + 1;

      // Union office events are auto-approved, others are pending
      const initialStatus =
        userRole === "union_office" ? "approved" : "pending";

      const newEvent = {
        ...eventData,
        id: newId,
        status: initialStatus,
        createdAt: new Date().toISOString(),
        // If auto-approved, add approval info
        ...(userRole === "union_office" && {
          approvedBy: "System (Union Office)",
          approvedAt: new Date().toISOString(),
        }),
      };

      events.push(newEvent);
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

      const successMessage =
        userRole === "union_office"
          ? "Sự kiện đã được tạo và phê duyệt tự động thành công"
          : "Sự kiện đã được tạo thành công";

      return {
        success: true,
        event: newEvent,
        message: successMessage,
      };
    } catch (error) {
      console.error("Error creating event:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi tạo sự kiện",
      };
    }
  }

  updateEvent(id, updatedData, userId = null, userRole = null) {
    try {
      const events = this.getAllEvents();
      const eventIndex = events.findIndex((event) => event.id === parseInt(id));

      if (eventIndex === -1) {
        return {
          success: false,
          message: "Không tìm thấy sự kiện",
        };
      }

      const event = events[eventIndex];

      // ✅ Permission check: only allow editing if user created the event or is union_office
      if (userId && userRole !== "union_office" && event.createdBy !== userId) {
        return {
          success: false,
          message: "Bạn không có quyền chỉnh sửa sự kiện này",
        };
      }

      events[eventIndex] = {
        ...events[eventIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

      return {
        success: true,
        event: events[eventIndex],
        message: "Cập nhật sự kiện thành công",
      };
    } catch (error) {
      console.error("Error updating event:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi cập nhật sự kiện",
      };
    }
  }

  deleteEvent(id, userId = null, userRole = null) {
    try {
      const events = this.getAllEvents();
      const eventIndex = events.findIndex((event) => event.id === parseInt(id));

      if (eventIndex === -1) {
        return {
          success: false,
          message: "Không tìm thấy sự kiện",
        };
      }

      const event = events[eventIndex];

      // ✅ Permission check: only allow deleting if user created the event or is union_office
      if (userId && userRole !== "union_office" && event.createdBy !== userId) {
        return {
          success: false,
          message: "Bạn không có quyền xóa sự kiện này",
        };
      }

      events.splice(eventIndex, 1);
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

      return {
        success: true,
        message: "Xóa sự kiện thành công",
      };
    } catch (error) {
      console.error("Error deleting event:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi xóa sự kiện",
      };
    }
  }

  // Event filtering methods
  getEventsByStatus(status) {
    try {
      const events = this.getAllEvents();
      return events.filter((event) => event.status === status);
    } catch (error) {
      console.error("Error filtering events by status:", error);
      return [];
    }
  }

  getEventsByOrganizer(organizer) {
    try {
      const events = this.getAllEvents();
      return events.filter((event) =>
        event.organizer.toLowerCase().includes(organizer.toLowerCase())
      );
    } catch (error) {
      console.error("Error filtering events by organizer:", error);
      return [];
    }
  }

  // Event approval methods
  approveEvent(id, approvedBy) {
    return this.updateEvent(id, {
      status: "approved",
      approvedBy: approvedBy,
      approvedAt: new Date().toISOString(),
    });
  }

  rejectEvent(id, rejectionReason, rejectedBy) {
    return this.updateEvent(id, {
      status: "rejected",
      rejectionReason: rejectionReason,
      rejectedBy: rejectedBy,
      rejectedAt: new Date().toISOString(),
    });
  }

  // User Registration Management
  registerUserForEvent(userId, eventId) {
    try {
      const registrations = this.getRegistrations();

      if (!registrations[userId]) {
        registrations[userId] = [];
      }

      if (registrations[userId].includes(parseInt(eventId))) {
        return {
          success: false,
          message: "Bạn đã đăng ký sự kiện này rồi",
        };
      }

      registrations[userId].push(parseInt(eventId));
      localStorage.setItem(
        STORAGE_KEYS.REGISTRATIONS,
        JSON.stringify(registrations)
      );

      return {
        success: true,
        message: "Đăng ký sự kiện thành công",
      };
    } catch (error) {
      console.error("Error registering for event:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi đăng ký sự kiện",
      };
    }
  }

  unregisterUserFromEvent(userId, eventId) {
    try {
      const registrations = this.getRegistrations();

      if (!registrations[userId]) {
        return {
          success: false,
          message: "Bạn chưa đăng ký sự kiện này",
        };
      }

      const eventIndex = registrations[userId].indexOf(parseInt(eventId));
      if (eventIndex === -1) {
        return {
          success: false,
          message: "Bạn chưa đăng ký sự kiện này",
        };
      }

      registrations[userId].splice(eventIndex, 1);
      localStorage.setItem(
        STORAGE_KEYS.REGISTRATIONS,
        JSON.stringify(registrations)
      );

      return {
        success: true,
        message: "Hủy đăng ký sự kiện thành công",
      };
    } catch (error) {
      console.error("Error unregistering from event:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi hủy đăng ký sự kiện",
      };
    }
  }

  getUserRegisteredEvents(userId) {
    try {
      const registrations = this.getRegistrations();
      const userRegistrations = registrations[userId] || [];
      const events = this.getAllEvents();

      return events.filter((event) => userRegistrations.includes(event.id));
    } catch (error) {
      console.error("Error getting user registered events:", error);
      return [];
    }
  }

  isUserRegisteredForEvent(userId, eventId) {
    try {
      const registrations = this.getRegistrations();
      const userRegistrations = registrations[userId] || [];
      return userRegistrations.includes(parseInt(eventId));
    } catch (error) {
      console.error("Error checking registration status:", error);
      return false;
    }
  }

  getRegistrations() {
    try {
      const registrations = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return registrations ? JSON.parse(registrations) : {};
    } catch (error) {
      console.error("Error getting registrations:", error);
      return {};
    }
  }

  // Image Management
  saveEventImage(eventId, imageData) {
    try {
      const images = this.getEventImages();
      images[eventId] = imageData;
      localStorage.setItem(STORAGE_KEYS.EVENT_IMAGES, JSON.stringify(images));

      return {
        success: true,
        message: "Lưu hình ảnh thành công",
      };
    } catch (error) {
      console.error("Error saving event image:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi lưu hình ảnh",
      };
    }
  }

  getEventImage(eventId) {
    try {
      const images = this.getEventImages();
      return images[eventId] || null;
    } catch (error) {
      console.error("Error getting event image:", error);
      return null;
    }
  }

  getEventImages() {
    try {
      const images = localStorage.getItem(STORAGE_KEYS.EVENT_IMAGES);
      return images ? JSON.parse(images) : {};
    } catch (error) {
      console.error("Error getting event images:", error);
      return {};
    }
  }

  // User Management
  getAllUsers() {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
  }

  // Thêm user mới (cho registration)
  addUser(newUser) {
    try {
      const users = this.getAllUsers();

      // Kiểm tra username đã tồn tại
      const existingUser = users.find(
        (user) => user.username === newUser.username
      );
      if (existingUser) {
        return {
          success: false,
          message: "Tên đăng nhập đã tồn tại",
        };
      }

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      return {
        success: true,
        user: newUser,
        message: "Thêm user thành công",
      };
    } catch (error) {
      console.error("Error adding user:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi thêm user",
      };
    }
  }

  // Tìm user theo username
  getUserByUsername(username) {
    try {
      const users = this.getAllUsers();
      return users.find((user) => user.username === username) || null;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return null;
    }
  }

  // Authentication methods - quản lý user hiện tại
  setCurrentUser(user) {
    try {
      console.log("StorageService - Setting current user:", user);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Error setting current user:", error);
      return false;
    }
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      const parsedUser = user ? JSON.parse(user) : null;
      console.log("StorageService - Getting current user:", parsedUser);
      return parsedUser;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  setSessionToken(token) {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, token);
      return true;
    } catch (error) {
      console.error("Error setting session token:", error);
      return false;
    }
  }

  getSessionToken() {
    try {
      return localStorage.getItem(STORAGE_KEYS.SESSION_TOKEN);
    } catch (error) {
      console.error("Error getting session token:", error);
      return null;
    }
  }

  clearAuth() {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      localStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
      return true;
    } catch (error) {
      console.error("Error clearing auth:", error);
      return false;
    }
  }

  updateUser(userId, updatedData) {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        return {
          success: false,
          message: "Không tìm thấy người dùng",
        };
      }

      users[userIndex] = {
        ...users[userIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      return {
        success: true,
        user: users[userIndex],
        message: "Cập nhật thông tin người dùng thành công",
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi cập nhật thông tin người dùng",
      };
    }
  }

  // Clear all data (for testing/reset)
  clearAllData() {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      this.initializeStorage();

      return {
        success: true,
        message: "Đã xóa tất cả dữ liệu và khôi phục về mặc định",
      };
    } catch (error) {
      console.error("Error clearing data:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi xóa dữ liệu",
      };
    }
  }

  // Export/Import data for backup
  exportData() {
    try {
      const data = {};
      Object.values(STORAGE_KEYS).forEach((key) => {
        data[key] = localStorage.getItem(key);
      });

      return {
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error exporting data:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi xuất dữ liệu",
      };
    }
  }

  importData(data) {
    try {
      Object.entries(data).forEach(([key, value]) => {
        if (Object.values(STORAGE_KEYS).includes(key)) {
          localStorage.setItem(key, value);
        }
      });

      return {
        success: true,
        message: "Nhập dữ liệu thành công",
      };
    } catch (error) {
      console.error("Error importing data:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi nhập dữ liệu",
      };
    }
  }
}

// Create singleton instance
const storageService = new StorageService();

export default storageService;
export { STORAGE_KEYS };
