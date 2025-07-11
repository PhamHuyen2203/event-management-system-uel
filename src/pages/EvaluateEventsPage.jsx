import React from "react";
import UserDashboardPage from "./UserDashboardPage";

const EvaluateEventsPage = () => {
  // This component reuses UserDashboardPage with different logic for union office
  // When accessed via /evaluate-events route, UserDashboardPage will show pending events
  return <UserDashboardPage />;
};

export default EvaluateEventsPage;
