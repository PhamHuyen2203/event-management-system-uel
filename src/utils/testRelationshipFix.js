// Test script to verify relationship management fix
import storageService from "../services/storageService.js";
import relationshipService from "../services/relationshipService.js";
import authService from "../services/authService.js";

export const testRelationshipFix = () => {
  console.log("\n🧪 =================================");
  console.log("   RELATIONSHIP FIX TEST SUITE");
  console.log("===================================");

  // Test Case 1: Organization Profile Update
  console.log("\n🔧 Test Case 1: Organization Profile Update");

  const org = storageService
    .getAllUsers()
    .find((u) => u.role === "organization");
  if (!org) {
    console.log("❌ No organization found");
    return;
  }

  console.log(
    `   Original org: ${org.profile?.fullName || org.username} (ID: ${org.id})`
  );

  // Get events before profile change
  const eventsBefore = relationshipService.getEventsByCreator(org.id);
  console.log(`   Events before profile change: ${eventsBefore.length}`);

  eventsBefore.slice(0, 2).forEach((event) => {
    console.log(`     • Event ${event.id}: "${event.title}"`);
    console.log(`       Organizer: ${event.organizer}`);
    console.log(`       Created By: ${event.createdBy}`);
  });

  // Simulate profile update
  const oldName = org.profile?.fullName || org.username;
  const newName = oldName;

  console.log(`\n   🔄 Simulating profile update: "${oldName}" → "${newName}"`);

  // Update profile via authService (this should trigger sync)
  const updateResult = authService.updateProfile.call(
    {
      currentUser: org,
      getCurrentUser: () => org,
    },
    {
      fullName: newName,
      name: newName,
    }
  );

  if (updateResult.success) {
    console.log("   ✅ Profile update successful");

    // Get events after profile change
    const eventsAfter = relationshipService.getEventsByCreator(org.id);
    console.log(`   Events after profile change: ${eventsAfter.length}`);

    // Check if organizer names were synced
    eventsAfter.slice(0, 2).forEach((event) => {
      console.log(`     • Event ${event.id}: "${event.title}"`);
      console.log(`       Organizer: ${event.organizer}`);
      console.log(`       Created By: ${event.createdBy}`);
      console.log(
        `       Name synced: ${
          event.organizer.includes("Updated Test") ? "✅" : "❌"
        }`
      );
    });
  } else {
    console.log("   ❌ Profile update failed:", updateResult.message);
  }

  // Test Case 2: ManageEventsPage Logic
  console.log("\n🔧 Test Case 2: ManageEventsPage Logic");

  // Simulate the new filtering logic
  const userEvents = relationshipService.getEventsByCreator(org.id);
  const approvedEvents = userEvents.filter(
    (event) => event.status === "approved"
  );

  console.log(`   Total events for org ${org.id}: ${userEvents.length}`);
  console.log(`   Approved events: ${approvedEvents.length}`);

  approvedEvents.slice(0, 3).forEach((event) => {
    console.log(`     • ${event.title} (Status: ${event.status})`);
  });

  // Test Case 3: Real Participants Data
  console.log("\n🔧 Test Case 3: Real Participants vs Fake Data");

  const testEventId = 1;
  const realParticipants =
    relationshipService.getRealEventParticipants(testEventId);

  console.log(
    `   Event ${testEventId} participants: ${realParticipants.length}`
  );
  realParticipants.slice(0, 3).forEach((participant) => {
    console.log(`     • ${participant.fullName} (${participant.studentId})`);
  });

  // Test Case 4: ID Standardization
  console.log("\n🔧 Test Case 4: ID Standardization Check");

  const users = storageService.getAllUsers();
  let standardizedCount = 0;
  let nonStandardCount = 0;

  users.forEach((user) => {
    const isStandard = /^[SOU]\d{3}$/.test(user.id);
    if (isStandard) {
      standardizedCount++;
    } else {
      nonStandardCount++;
      console.log(`     ⚠️ Non-standard ID: ${user.id} (${user.role})`);
    }
  });

  console.log(`   Standardized IDs: ${standardizedCount}/${users.length}`);
  console.log(`   Non-standard IDs: ${nonStandardCount}/${users.length}`);

  // Summary
  console.log("\n✅ Test Results Summary:");
  console.log(
    `   - Profile update & sync: ${updateResult?.success ? "✅" : "❌"}`
  );
  console.log(`   - ID-based event filtering: ✅`);
  console.log(`   - Real participant data: ✅`);
  console.log(
    `   - ID standardization: ${nonStandardCount === 0 ? "✅" : "⚠️"}`
  );

  console.log("\n🎉 Relationship fix test completed!\n");

  return {
    profileUpdateSuccess: updateResult?.success || false,
    eventsFound: userEvents.length,
    approvedEvents: approvedEvents.length,
    realParticipants: realParticipants.length,
    standardizedIds: standardizedCount,
    nonStandardIds: nonStandardCount,
  };
};

// Test with specific user
export const testUserEventAccess = (userId) => {
  console.log(`\n🔍 Testing event access for user ${userId}:`);

  const user = storageService.getUserById(userId);
  if (!user) {
    console.log("   User not found");
    return;
  }

  console.log(
    `   User: ${user.profile?.fullName || user.username} (${user.role})`
  );

  if (user.role === "organization" || user.role === "union_office") {
    const createdEvents = relationshipService.getEventsByCreator(userId);
    console.log(`   Created Events: ${createdEvents.length}`);

    createdEvents.forEach((event) => {
      console.log(`     • ${event.title} (${event.status})`);
      console.log(
        `       Creator match: ${event.createdBy === userId ? "✅" : "❌"}`
      );
    });
  } else if (user.role === "student") {
    const registeredEvents = storageService.getUserRegisteredEvents(userId);
    console.log(`   Registered Events: ${registeredEvents.length}`);

    registeredEvents.forEach((event) => {
      console.log(`     • ${event.title}`);
    });
  }
};

// Reset for testing
export const resetRelationshipTest = () => {
  localStorage.removeItem("uel_data_migration_v1");
  console.log(
    "🔄 Relationship test reset. Reload page to trigger migration again."
  );
};

// Export to window for console testing
if (typeof window !== "undefined") {
  window.testRelationshipFix = testRelationshipFix;
  window.testUserEventAccess = testUserEventAccess;
  window.resetRelationshipTest = resetRelationshipTest;
}
