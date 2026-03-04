import React, { useState } from "react";

export default function Dashboard({ setActivePage }) {
  const [showNewCompaniesTable, setShowNewCompaniesTable] = useState(false);
  const [showChurnedCompaniesTable, setShowChurnedCompaniesTable] = useState(false);

  const newCompaniesData = [
    { title: "Test A", certificateType: "EV, OV", revenue: 50000 },
    { title: "Test B", certificateType: "EV", revenue: 75000 },
  ];

  const churnedCompaniesData = [
    { title: "Test X", certificateType: "OV", pastRevenue: 40000, reason: "Contract ended" },
    { title: "Test Y", certificateType: "EV", pastRevenue: 60000, reason: "Inactive" },
  ];

  return (
    <div className="dashboard-container" style={{ margin: "20px" }}>

      {/* ================= TOP 4 CARDS ================= */}
      <div
        className="dashboard-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setActivePage("revenue")}
        >
          <div className="card-icon" style={{ backgroundColor: "#d0f0d7" }}>$</div>
          <div className="card-content">
            <p className="card-title" style={{ fontWeight: "bold" }}>
              Total Revenue
            </p>
            <p className="card-value">$4.5M</p>
            <p className="card-subtext">+18.2% from last month</p>
          </div>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setActivePage("companies")}
        >
          <div className="card-icon" style={{ backgroundColor: "#d9e6ff" }}>🏢</div>
          <div className="card-content">
            <p className="card-title" style={{ fontWeight: "bold" }}>
              Active Companies
            </p>
            <p className="card-value">248</p>
            <p className="card-subtext">+2 new this month</p>
          </div>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setActivePage("certificates")}
        >
          <div className="card-icon" style={{ backgroundColor: "#ffecdb" }}>📄</div>
          <div className="card-content">
            <p className="card-title" style={{ fontWeight: "bold" }}>
              Total Certificates
            </p>
            <p className="card-value">2,030</p>
            <p className="card-subtext">+245 added</p>
          </div>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setActivePage("certificates")}
        >
          <div className="card-icon" style={{ backgroundColor: "#d0f0d7" }}>⬆️</div>
          <div className="card-content">
            <p className="card-title" style={{ fontWeight: "bold" }}>
              Renewed Certificates
            </p>
            <p className="card-value">97.4%</p>
            <p className="card-subtext">+2.1% improvement</p>
          </div>
        </div>
      </div>

      {/* ================= NEW 2 CARDS ================= */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        <div
          className="card"
          style={{
            flex: 1,
            cursor: "pointer",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            height: "120px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
          onClick={() =>
            setShowNewCompaniesTable(!showNewCompaniesTable)
          }
        >
          <div className="card-icon" style={{ backgroundColor: "#d9e6ff" }}>🏢</div>
          <div>
            <p style={{ fontWeight: "bold" }}>
              New Companies Onboarded in the selected period
            </p>
            <p style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>
              +2 companies
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            flex: 1,
            cursor: "pointer",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            height: "120px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
          onClick={() =>
            setShowChurnedCompaniesTable(!showChurnedCompaniesTable)
          }
        >
          <div className="card-icon" style={{ backgroundColor: "#d9e6ff" }}>🏢</div>
          <div>
            <p style={{ fontWeight: "bold" }}>
              Companies Churned / Inactive in the selected period
            </p>
            <p style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
              -2 companies
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABLES ================= */}

      {showNewCompaniesTable && (
        <div style={{ marginTop: "25px", padding: "0 20px" }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Certificate Type</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {newCompaniesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.certificateType}</td>
                  <td>${item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showChurnedCompaniesTable && (
        <div style={{ marginTop: "25px", padding: "0 20px" }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Certificate Type</th>
                <th>Past Revenue</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {churnedCompaniesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.certificateType}</td>
                  <td>${item.pastRevenue.toLocaleString()}</td>
                  <td>{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}