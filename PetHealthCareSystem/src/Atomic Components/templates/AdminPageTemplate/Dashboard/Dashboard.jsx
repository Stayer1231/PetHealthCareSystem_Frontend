import React from "react";
import "./Dashboard.scss"; // Assuming you have styles defined here
import DashBoardHeader from "../../../organisms/DashboardView/DashboardHeader/DashBoardHeader";
import DashboardBody from "../../../organisms/DashboardView/DashboardBody/DashboardBody";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header-contain">
        <h1 className="dashboard-header-contain-title">Dashboard</h1>
        <DashBoardHeader />
      </div>
      <div className="dashboard-body-contain">
        <h2 className="dashboard-body-contain-title">Column chart of data statistics</h2>
        <DashboardBody />
      </div>
    </div>
  );
};

export default Dashboard;
