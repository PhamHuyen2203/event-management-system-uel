import storageService from "./storageService.js";

// Service to manage relationships between Users, Events, and Registrations
class RelationshipService {
  constructor() {
    this.migrationCompleted =
      localStorage.getItem("uel_data_migration_v1") === "true";
    if (!this.migrationCompleted) {
      this.migrateData();
    }
  }

  // Migrate existing data to use proper ID relationships
  migrateData() {
    console.log("🔄 Starting data migration for relationship linking...");

    try {
      // Step 1: Standardize user IDs and create organizer mapping
      this.standardizeUserIds();

      // Step 2: Add creator IDs to events
      this.linkEventsToCreators();

      // Step 3: Migrate old registrations to new format
      this.migrateRegistrations();

      // Mark migration as completed
      localStorage.setItem("uel_data_migration_v1", "true");
      console.log("✅ Data migration completed successfully");
    } catch (error) {
      console.error("❌ Data migration failed:", error);
    }
  }

  // Standardize user IDs from timestamp-based to proper format
  standardizeUserIds() {
    const users = storageService.getAllUsers();
    let modified = false;

    users.forEach((user) => {
      // Convert timestamp-based IDs to proper format
      if (user.id && user.id.startsWith("S") && user.id.length > 4) {
        const newId = this.generateStandardUserId(user.role);
        console.log(`📝 Migrating user ID: ${user.id} -> ${newId}`);

        // Update user ID
        const oldId = user.id;
        user.id = newId;

        // Update any registrations that reference the old ID
        this.updateRegistrationUserId(oldId, newId);
        modified = true;
      }
    });

    if (modified) {
      storageService.updateAllUsers(users);
    }
  }

  // Generate standard user ID based on role
  generateStandardUserId(role) {
    const users = storageService.getAllUsers();
    const prefix =
      role === "student" ? "S" : role === "organization" ? "O" : "U";

    // Find the highest existing number for this role
    let maxNum = 0;
    users.forEach((user) => {
      if (user.id && user.id.startsWith(prefix)) {
        const num = parseInt(user.id.substring(1));
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });

    return `${prefix}${String(maxNum + 1).padStart(3, "0")}`;
  }

  // Create mapping between organizer names and user IDs
  createOrganizerMapping() {
    const users = storageService.getAllUsers();
    const mapping = {};

    users.forEach((user) => {
      if (user.role === "organization" || user.role === "union_office") {
        const organizerName =
          user.profile?.fullName || user.profile?.name || user.username;
        mapping[organizerName] = user.id;
      }
    });

    // Special mappings for common organizer names
    const specialMappings = {
      "Đoàn Khoa Hệ thông thông tin": this.findUserByPattern(
        "tech",
        "organization"
      ),
      "Tuổi trẻ Kinh tế - Luật": this.findUserByPattern(
        "business|youth",
        "organization"
      ),
      "ITB CLUB": this.findUserByPattern("itb|tech", "organization"),
      "Phòng Hợp tác phát triển": this.findUserByPattern(
        "cooperation|development",
        "union_office"
      ),
      "Liên Chi Hội Khoa Quản trị kinh doanh": this.findUserByPattern(
        "business|management",
        "organization"
      ),
      "Đoàn khoa Luật Kinh tế": this.findUserByPattern(
        "law|legal",
        "organization"
      ),
      "FTC CLUB": this.findUserByPattern("ftc|finance", "organization"),
      "Phòng Công tác Sinh viên": this.findUserByPattern(
        "student.*affairs",
        "union_office"
      ),
      "Đoàn Thanh niên UEL": this.findUserByPattern(
        "youth|union",
        "union_office"
      ),
      "UEL Tech Club": this.findUserByPattern("tech|it", "organization"),
    };

    return { ...mapping, ...specialMappings };
  }

  // Find user by pattern matching in profile or username
  findUserByPattern(pattern, role) {
    const users = storageService.getAllUsers();
    const regex = new RegExp(pattern, "i");

    const user = users.find(
      (u) =>
        u.role === role &&
        (regex.test(u.profile?.fullName || "") ||
          regex.test(u.profile?.name || "") ||
          regex.test(u.username || "") ||
          regex.test(u.profile?.description || ""))
    );

    return user?.id || null;
  }

  // Link events to their creators
  linkEventsToCreators() {
    const events = storageService.getAllEvents();
    const organizerMapping = this.createOrganizerMapping();
    let modified = false;

    events.forEach((event) => {
      if (!event.createdBy && event.organizer) {
        const creatorId = organizerMapping[event.organizer];
        if (creatorId) {
          event.createdBy = creatorId;
          console.log(
            `🔗 Linked event "${event.title}" to creator ${creatorId}`
          );
          modified = true;
        } else {
          console.warn(`⚠️ No creator found for organizer: ${event.organizer}`);
        }
      }
    });

    if (modified) {
      storageService.updateAllEvents(events);
    }
  }

  // Migrate old registrations and link to actual user data
  migrateRegistrations() {
    const events = storageService.getAllEvents();
    const users = storageService.getAllUsers();

    // Create actual registrations based on mock data
    users.forEach((user) => {
      if (user.registeredEvents && Array.isArray(user.registeredEvents)) {
        user.registeredEvents.forEach((eventIdString) => {
          // Convert "EVT001" format to numeric ID
          const eventId = this.convertEventIdToNumeric(eventIdString);
          if (eventId) {
            const result = storageService.registerUserForEvent(
              user.id,
              eventId
            );
            if (result.success) {
              console.log(
                `📋 Migrated registration: User ${user.id} -> Event ${eventId}`
              );
            }
          }
        });
      }
    });
  }

  // Convert "EVT001" format to numeric event ID
  convertEventIdToNumeric(eventIdString) {
    if (typeof eventIdString === "string" && eventIdString.startsWith("EVT")) {
      const num = parseInt(eventIdString.substring(3));
      return isNaN(num) ? null : num;
    }
    return null;
  }

  // Update registrations when user ID changes
  updateRegistrationUserId(oldId, newId) {
    const registrations = storageService.getRegistrations();

    if (registrations[oldId]) {
      registrations[newId] = registrations[oldId];
      delete registrations[oldId];

      localStorage.setItem("uel_registrations", JSON.stringify(registrations));
      console.log(`📋 Updated registration mapping: ${oldId} -> ${newId}`);
    }
  }

  // Get real participants for an event (not fake data)
  getRealEventParticipants(eventId) {
    const registrations = storageService.getRegistrations();
    const users = storageService.getAllUsers();
    const participants = [];

    // Find all users registered for this event
    Object.keys(registrations).forEach((userId) => {
      if (registrations[userId].includes(parseInt(eventId))) {
        const user = users.find((u) => u.id === userId);
        if (user && user.role === "student") {
          participants.push({
            id: user.id,
            studentId: user.profile?.studentId || user.id,
            lastName: this.extractLastName(user.profile?.fullName || ""),
            firstName: this.extractFirstName(user.profile?.fullName || ""),
            fullName: user.profile?.fullName || "Chưa cập nhật",
            class: user.profile?.class || "Chưa cập nhật",
            faculty: user.profile?.faculty || "Chưa cập nhật",
            birthDate: user.profile?.dateOfBirth || "Chưa cập nhật",
            registrationDate: user.createdAt,
          });
        }
      }
    });

    return participants.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  // Extract last name from full name
  extractLastName(fullName) {
    if (!fullName) return "Chưa cập nhật";
    const parts = fullName.trim().split(" ");
    return parts.length > 1 ? parts.slice(0, -1).join(" ") : fullName;
  }

  // Extract first name from full name
  extractFirstName(fullName) {
    if (!fullName) return "Chưa cập nhật";
    const parts = fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : fullName;
  }

  // Sync profile changes across all related data
  syncProfileChanges(userId, updatedProfile) {
    console.log(`🔄 Syncing profile changes for user ${userId}`);

    const user = storageService.getUserById(userId);
    if (!user) return false;

    try {
      // Update events created by this user
      if (user.role === "organization" || user.role === "union_office") {
        this.syncEventOrganizerName(
          userId,
          updatedProfile.fullName || updatedProfile.name
        );
      }

      // Update any other references to this user
      this.syncUserReferences(userId, updatedProfile);

      console.log(`✅ Profile sync completed for user ${userId}`);
      return true;
    } catch (error) {
      console.error(`❌ Profile sync failed for user ${userId}:`, error);
      return false;
    }
  }

  // Sync organizer name in events when organization profile changes
  syncEventOrganizerName(creatorId, newOrganizerName) {
    const events = storageService.getAllEvents();
    let modified = false;

    events.forEach((event) => {
      if (event.createdBy === creatorId && newOrganizerName) {
        const oldOrganizer = event.organizer;
        event.organizer = newOrganizerName;
        console.log(
          `📝 Updated event organizer: "${oldOrganizer}" -> "${newOrganizerName}"`
        );
        modified = true;
      }
    });

    if (modified) {
      storageService.updateAllEvents(events);
    }
  }

  // Sync other user references across the system
  syncUserReferences(userId, updatedProfile) {
    // Add any other reference synchronization here
    // For example: comments, reviews, activity logs, etc.
    console.log(`🔄 Syncing other references for user ${userId}`);
  }

  // Get events created by a specific user
  getEventsByCreator(userId) {
    const events = storageService.getAllEvents();
    return events.filter((event) => event.createdBy === userId);
  }

  // Get statistics for a user
  getUserStats(userId) {
    const user = storageService.getUserById(userId);
    if (!user) return null;

    const stats = {
      userId: userId,
      role: user.role,
      createdEvents: 0,
      registeredEvents: 0,
      managedEvents: 0,
    };

    if (user.role === "organization") {
      stats.createdEvents = this.getEventsByCreator(userId).length;
    } else if (user.role === "student") {
      stats.registeredEvents =
        storageService.getUserRegisteredEvents(userId).length;
    } else if (user.role === "union_office") {
      stats.managedEvents = this.getEventsByCreator(userId).length;
    }

    return stats;
  }
}

// Create singleton instance
const relationshipService = new RelationshipService();
export default relationshipService;
