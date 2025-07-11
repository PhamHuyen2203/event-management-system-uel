// Test script to demonstrate data migration and relationship linking
import storageService from "../services/storageService.js";
import relationshipService from "../services/relationshipService.js";

export const testDataMigration = () => {
  console.log("\n🧪 =================================");
  console.log("     DATA MIGRATION TEST SUITE");
  console.log("===================================");

  // 1. Test User Data Structure
  console.log("\n📊 1. Testing User Data Structure:");
  const users = storageService.getAllUsers();
  console.log(`   Total users: ${users.length}`);

  users.forEach((user) => {
    console.log(
      `   User ${user.id}: ${user.profile?.fullName || user.username} (${
        user.role
      })`
    );
    if (user.registeredEvents && user.registeredEvents.length > 0) {
      console.log(
        `     - Registered Events: ${user.registeredEvents.join(", ")}`
      );
    }
  });

  // 2. Test Event-Creator Linking
  console.log("\n🔗 2. Testing Event-Creator Linking:");
  const events = storageService.getAllEvents();
  events.slice(0, 5).forEach((event) => {
    console.log(`   Event ${event.id}: "${event.title}"`);
    console.log(`     - Organizer: ${event.organizer}`);
    console.log(`     - Created By: ${event.createdBy || "Not linked"}`);

    if (event.createdBy) {
      const creator = storageService.getUserById(event.createdBy);
      if (creator) {
        console.log(
          `     - Creator Info: ${
            creator.profile?.fullName || creator.username
          } (${creator.role})`
        );
      }
    }
  });

  // 3. Test Registration System
  console.log("\n📋 3. Testing Registration System:");
  const registrations = storageService.getRegistrations();
  console.log(
    `   Total registration entries: ${Object.keys(registrations).length}`
  );

  Object.entries(registrations).forEach(([userId, eventIds]) => {
    const user = storageService.getUserById(userId);
    if (user && eventIds.length > 0) {
      console.log(
        `   User ${userId} (${user.profile?.fullName || user.username}):`
      );
      console.log(`     - Registered for events: ${eventIds.join(", ")}`);
    }
  });

  // 4. Test Real Participants Data
  console.log("\n👥 4. Testing Real Participants Data:");
  [1, 2, 3].forEach((eventId) => {
    const participants = relationshipService.getRealEventParticipants(eventId);
    const event = storageService.getEventById(eventId);
    console.log(`   Event ${eventId} - "${event?.title?.substring(0, 50)}..."`);
    console.log(`     - Real participants: ${participants.length}`);

    participants.slice(0, 3).forEach((participant) => {
      console.log(
        `       • ${participant.fullName} (${participant.studentId}) - ${participant.class}`
      );
    });
  });

  // 5. Test Profile Sync
  console.log("\n🔄 5. Testing Profile Sync Capability:");
  const testUser = users.find((u) => u.role === "organization");
  if (testUser) {
    console.log(
      `   Test organization: ${testUser.profile?.fullName || testUser.username}`
    );
    console.log(
      `   Events created by this org: ${
        relationshipService.getEventsByCreator(testUser.id).length
      }`
    );

    // Simulate profile change
    console.log("   Simulating profile name change...");
    const oldName = testUser.profile?.fullName;
    const newName = oldName + " (Updated)";

    // Test sync function
    relationshipService.syncProfileChanges(testUser.id, {
      ...testUser.profile,
      fullName: newName,
    });

    console.log(`   Profile sync completed: ${oldName} → ${newName}`);
  }

  // 6. Test Migration Status
  console.log("\n✅ 6. Migration Status:");
  const migrationStatus = localStorage.getItem("uel_data_migration_v1");
  console.log(
    `   Migration completed: ${migrationStatus === "true" ? "Yes" : "No"}`
  );

  // 7. Test Statistics
  console.log("\n📈 7. System Statistics:");
  console.log(`   Total Users: ${users.length}`);
  console.log(
    `   - Students: ${users.filter((u) => u.role === "student").length}`
  );
  console.log(
    `   - Organizations: ${
      users.filter((u) => u.role === "organization").length
    }`
  );
  console.log(
    `   - Union Office: ${
      users.filter((u) => u.role === "union_office").length
    }`
  );
  console.log(`   Total Events: ${events.length}`);
  console.log(
    `   Events with creator links: ${events.filter((e) => e.createdBy).length}`
  );
  console.log(
    `   Total registration entries: ${Object.keys(registrations).length}`
  );

  console.log("\n🎉 Migration test completed!\n");

  return {
    users: users.length,
    events: events.length,
    eventsWithCreators: events.filter((e) => e.createdBy).length,
    registrations: Object.keys(registrations).length,
    migrationCompleted: migrationStatus === "true",
  };
};

// Test individual components
export const testUserRegistrations = (userId) => {
  console.log(`\n🔍 Testing registrations for user ${userId}:`);

  const user = storageService.getUserById(userId);
  if (!user) {
    console.log("   User not found");
    return;
  }

  console.log(
    `   User: ${user.profile?.fullName || user.username} (${user.role})`
  );

  const registeredEvents = storageService.getUserRegisteredEvents(userId);
  console.log(`   Registered Events: ${registeredEvents.length}`);

  registeredEvents.forEach((event) => {
    console.log(`     • ${event.title} (ID: ${event.id})`);
  });
};

export const testEventParticipants = (eventId) => {
  console.log(`\n🔍 Testing participants for event ${eventId}:`);

  const event = storageService.getEventById(eventId);
  if (!event) {
    console.log("   Event not found");
    return;
  }

  console.log(`   Event: ${event.title}`);
  console.log(`   Organizer: ${event.organizer}`);

  const participants = relationshipService.getRealEventParticipants(eventId);
  console.log(`   Real Participants: ${participants.length}`);

  participants.forEach((participant) => {
    console.log(
      `     • ${participant.fullName} (${participant.studentId}) - ${participant.class}`
    );
  });
};

// Clear migration flag for testing
export const resetMigration = () => {
  localStorage.removeItem("uel_data_migration_v1");
  console.log(
    "🔄 Migration flag reset. Reload page to trigger migration again."
  );
};

// Export functions to window for console testing
if (typeof window !== "undefined") {
  window.testDataMigration = testDataMigration;
  window.testUserRegistrations = testUserRegistrations;
  window.testEventParticipants = testEventParticipants;
  window.resetMigration = resetMigration;
}
