// src/components/TopFilters.js
import React from "react";

function TopFilters({ dateRange, setDateRange, country, setCountry }) {
  return (
    <div className="topbar">
      <input
        className="search-input"
        placeholder="Search companies, certificates, analytics..."
        type="search"
      />

      <div className="filters">
        <select
          className="filter-select"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last 1 Year</option>
          <option value="2y">Last 2 Years</option>
          <option value="3y">Last 3 Years</option>
        </select>

        <select
          className="filter-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="US">US</option>
          <option value="BE">BE</option>
          <option value="JA">JA</option>
          <option value="IN">IN</option>
        </select>

        <button className="filter-button">Filters</button>
      </div>
    </div>
  );
}

export default TopFilters;