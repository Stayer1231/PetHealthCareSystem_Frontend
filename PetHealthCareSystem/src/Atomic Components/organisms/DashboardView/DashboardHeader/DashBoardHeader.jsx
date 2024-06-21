import React from 'react'

const DashBoardHeader = () => {
  return (
    <div className="dashboard-header-contain-view">
    <div id="total-users" className="dashboard-header-contain-view-data">
      <h2 className="dashboard-header-contain-view-data-title">
        Total Users
      </h2>
      <h2 className="dashboard-header-contain-view-data-value">10</h2>
    </div>
    <div id="total-pets" className="dashboard-header-contain-view-data">
      <h2 className="dashboard-header-contain-view-data-title">
        Total Pets
      </h2>
      <h2 className="dashboard-header-contain-view-data-value">10</h2>
    </div>
    <div
      id="total-appointments"
      className="dashboard-header-contain-view-data"
    >
      <h2 className="dashboard-header-contain-view-data-title">
        Total Appointments
      </h2>
      <h2 className="dashboard-header-contain-view-data-value">10</h2>
    </div>
    <div id="total-services" className="dashboard-header-contain-view-data">
      <h2 className="dashboard-header-contain-view-data-title">
        Total Services
      </h2>
      <h2 className="dashboard-header-contain-view-data-value">10</h2>
    </div>
  </div>
  )
}

export default DashBoardHeader