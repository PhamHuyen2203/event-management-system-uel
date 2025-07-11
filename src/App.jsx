import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import relationshipService from "./services/relationshipService";
import { testDataMigration } from "./utils/testDataMigration";
import { testRelationshipFix } from "./utils/testRelationshipFix";
import { testQRFlow } from "./utils/testQRFlow";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import PersonalInformationPage from "./pages/PersonalInformationPage";
import AdjustInformationPage from "./pages/AdjustInformationPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UELEventsPage from "./pages/UELEventsPage";
import RegisteredEventsPage from "./pages/RegisteredEventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEventPage from "./pages/CreateEventPage";
import AdjustEventPage from "./pages/AdjustEventPage";
import ManageEventsPage from "./pages/ManageEventsPage";
import OurEventsPage from "./pages/OurEventsPage";
import EvaluateEventsPage from "./pages/EvaluateEventsPage";
import QRCodePage from "./pages/QRCodePage";
import QRDemoPage from "./pages/QRDemoPage";
import ViewReportsPage from "./pages/ViewReportsPage";
import RegistrationListPage from "./pages/RegistrationListPage";
import ListOfParticipantsPage from "./pages/ListOfParticipantsPage";
import ApprovalSuccessPage from "./pages/ApprovalSuccessPage";
import RejectionFormPage from "./pages/RejectionFormPage";
import "./App.css";

function App() {
  // Initialize relationship service on app startup
  useEffect(() => {
    console.log("🚀 Initializing relationship service...");
    // RelationshipService constructor will handle data migration automatically

    // Run migration test after a short delay to ensure migration is complete
    setTimeout(() => {
      if (process.env.NODE_ENV === "development") {
        testDataMigration();

        // Test relationship fix after migration
        setTimeout(() => {
          testRelationshipFix();

          // Test QR flow
          setTimeout(() => {
            testQRFlow();
          }, 1000);
        }, 2000);
      }
    }, 1000);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/personal-info" element={<PersonalInfoPage />} />
            <Route
              path="/personal-information"
              element={<PersonalInformationPage />}
            />
            <Route
              path="/adjust-information"
              element={<AdjustInformationPage />}
            />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/events" element={<UELEventsPage />} />
            <Route
              path="/registered-events"
              element={<RegisteredEventsPage />}
            />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/adjust-event" element={<AdjustEventPage />} />
            <Route path="/manage-events" element={<ManageEventsPage />} />
            <Route path="/our-events" element={<OurEventsPage />} />
            <Route path="/evaluate-events" element={<EvaluateEventsPage />} />
            <Route path="/qr-code" element={<QRCodePage />} />
            <Route path="/qr-demo" element={<QRDemoPage />} />
            <Route path="/view-reports" element={<ViewReportsPage />} />
            <Route
              path="/registration-list"
              element={<RegistrationListPage />}
            />
            <Route
              path="/list-of-participants"
              element={<ListOfParticipantsPage />}
            />
            <Route path="/approval-success" element={<ApprovalSuccessPage />} />
            <Route path="/rejection-form" element={<RejectionFormPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
