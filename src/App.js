import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopFilters from "./components/TopFilters";
import Dashboard from "./components/Dashboard";
import RevenueAnalytics from "./components/RevenueAnalytics";
import Companies from "./components/Companies";
import Certificates from "./components/Certificates";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [dateRange, setDateRange] = useState("6m");
  const [country, setCountry] = useState("US");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard setActivePage={setActivePage} />;
      case "revenue":
        return <RevenueAnalytics />;
      case "companies":
        return <Companies />;
      case "certificates":
        return <Certificates />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="main">
        <TopFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          country={country}
          setCountry={setCountry}
        />
        <div className="page-content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;