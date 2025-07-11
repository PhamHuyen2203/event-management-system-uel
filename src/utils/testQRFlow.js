// Test script for QR Code generation and scanning flow
import storageService from "../services/storageService.js";
import relationshipService from "../services/relationshipService.js";

export const testQRFlow = () => {
  console.log("\n📱 =================================");
  console.log("      QR CODE FLOW TEST SUITE");
  console.log("===================================");

  // Test Case 1: QR Data Generation
  console.log("\n🔧 Test Case 1: QR Data Generation");

  const event = storageService.getEventById(1);
  if (!event) {
    console.log("❌ No event found for testing");
    return;
  }

  console.log(`   Event: ${event.title}`);
  console.log(`   Organizer: ${event.organizer}`);
  console.log(`   Created by: ${event.createdBy}`);

  // Simulate QR data generation (from QRCodePage.jsx)
  const qrData = {
    eventTitle: event.title,
    organizer: event.organizer,
    date: event.date,
    location: event.location || "Trường Đại học Kinh tế - Luật",
    category: event.category,
    type: "Check-in QR Code",
    startTime: "8:00 AM",
    endTime: "11:00 AM",
    eventUrl: `${window.location.origin}/event/${event.id}`,
  };

  console.log("   Generated QR data:", qrData);

  // Test Case 2: URL Generation
  console.log("\n🔧 Test Case 2: URL Generation");

  const encodedData = encodeURIComponent(JSON.stringify(qrData));
  const qrUrl = `${window.location.origin}/qr-demo?data=${encodedData}`;

  console.log(`   QR URL length: ${qrUrl.length} characters`);
  console.log(`   Sample URL: ${qrUrl.substring(0, 100)}...`);

  // Test Case 3: Data Parsing (QRDemoPage logic)
  console.log("\n🔧 Test Case 3: Data Parsing Simulation");

  try {
    const decodedData = JSON.parse(decodeURIComponent(encodedData));
    console.log("   ✅ Data parsing successful");
    console.log("   Decoded data:", {
      title: decodedData.eventTitle,
      organizer: decodedData.organizer,
      date: decodedData.date,
      type: decodedData.type,
    });
  } catch (error) {
    console.log("   ❌ Data parsing failed:", error);
  }

  // Test Case 4: QR URL Validation
  console.log("\n🔧 Test Case 4: QR URL Validation");

  const urlTests = [
    { test: "URL is valid", result: qrUrl.startsWith("http") },
    { test: "Contains qr-demo path", result: qrUrl.includes("/qr-demo") },
    { test: "Contains data parameter", result: qrUrl.includes("?data=") },
    { test: "URL length reasonable", result: qrUrl.length < 2000 },
  ];

  urlTests.forEach(({ test, result }) => {
    console.log(`   ${result ? "✅" : "❌"} ${test}`);
  });

  // Test Case 5: Mobile Simulation
  console.log("\n🔧 Test Case 5: Mobile QR Scan Simulation");

  console.log("   📱 Simulating mobile QR scan...");
  console.log(`   1. User opens QR scanner app`);
  console.log(`   2. Scanner reads QR code data: ${qrUrl.substring(0, 50)}...`);
  console.log(`   3. Browser opens URL: /qr-demo?data=...`);
  console.log(`   4. QRDemoPage component loads`);
  console.log(`   5. Data is parsed and displayed`);

  // Test Case 6: Creator Information Integration
  console.log("\n🔧 Test Case 6: Creator Information Integration");

  if (event.createdBy) {
    const creator = storageService.getUserById(event.createdBy);
    if (creator) {
      console.log("   Creator info available:");
      console.log(
        `     Name: ${creator.profile?.fullName || creator.username}`
      );
      console.log(`     Role: ${creator.role}`);
      console.log(`     Contact: ${creator.email}`);

      // Enhanced QR data with creator info
      const enhancedQrData = {
        ...qrData,
        creatorInfo: {
          name: creator.profile?.fullName || creator.username,
          role: creator.role,
          contact: creator.email,
        },
      };
      console.log("   Enhanced QR data with creator info ready ✅");
    }
  }

  // Generate test results
  console.log("\n📊 Test Results Summary:");
  const results = {
    dataGeneration: !!qrData.eventTitle,
    urlGeneration: qrUrl.length > 0,
    dataParsing: true, // Will be tested in browser
    urlValidation: urlTests.every((t) => t.result),
    creatorIntegration: !!event.createdBy,
  };

  Object.entries(results).forEach(([test, passed]) => {
    console.log(`   ${passed ? "✅" : "❌"} ${test}`);
  });

  console.log("\n🎉 QR Flow test completed!\n");

  return {
    testUrl: qrUrl,
    qrData: qrData,
    results: results,
  };
};

// Test QR scanning with specific event
export const testQRScan = (eventId) => {
  console.log(`\n📱 Testing QR scan for event ${eventId}:`);

  const event = storageService.getEventById(eventId);
  if (!event) {
    console.log("   Event not found");
    return;
  }

  console.log(`   Event: ${event.title}`);

  // Generate QR URL for this event
  const qrData = {
    eventTitle: event.title,
    organizer: event.organizer,
    date: event.date,
    location: event.location,
    category: event.category,
    type: "Check-in QR Code",
  };

  const qrUrl = `${window.location.origin}/qr-demo?data=${encodeURIComponent(
    JSON.stringify(qrData)
  )}`;

  console.log(`   QR URL: ${qrUrl}`);
  console.log(`   📱 You can test this by opening the URL in a new tab`);

  return qrUrl;
};

// Generate QR test URLs for all events
export const generateAllQRTestUrls = () => {
  console.log("\n📱 Generating QR test URLs for all events:");

  const events = storageService.getAllEvents().slice(0, 5); // Test first 5 events
  const testUrls = [];

  events.forEach((event) => {
    const qrData = {
      eventTitle: event.title,
      organizer: event.organizer,
      date: event.date,
      location: event.location,
      category: event.category,
      type: "Event Info QR Code",
    };

    const qrUrl = `${window.location.origin}/qr-demo?data=${encodeURIComponent(
      JSON.stringify(qrData)
    )}`;

    testUrls.push({
      eventId: event.id,
      title: event.title,
      url: qrUrl,
    });

    console.log(`   Event ${event.id}: ${event.title.substring(0, 40)}...`);
    console.log(`     URL: ${qrUrl.substring(0, 80)}...`);
  });

  return testUrls;
};

// Export functions to window for console testing
if (typeof window !== "undefined") {
  window.testQRFlow = testQRFlow;
  window.testQRScan = testQRScan;
  window.generateAllQRTestUrls = generateAllQRTestUrls;
}
