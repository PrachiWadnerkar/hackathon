import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const certificatePieData = [
  { name: "EV", value: 45, color: "#8884d8" },
  { name: "OV", value: 30, color: "#82ca9d" },
  { name: "DV", value: 25, color: "#ffc658" },
];

const certificateTableData = [
  {
    certificateType: "EV",
    revenueGenerated: 1000000,
    percentIncrease: 12,
    certificatesIssued: 2000,
    renewalRate: 75,
    avgDuration: "1 year",
    expirationRate: 5,
    avgRevenuePerCert: 500,
  },
  {
    certificateType: "OV",
    revenueGenerated: 750000,
    percentIncrease: 8,
    certificatesIssued: 1500,
    renewalRate: 60,
    avgDuration: "1 year",
    expirationRate: 7,
    avgRevenuePerCert: 500,
  },
  {
    certificateType: "DV",
    revenueGenerated: 500000,
    percentIncrease: 15,
    certificatesIssued: 1200,
    renewalRate: 55,
    avgDuration: "6 months",
    expirationRate: 3,
    avgRevenuePerCert: 416,
  },
];

const columns = [
  { key: "certificateType", label: "Certificate Type" },
  { key: "revenueGenerated", label: "Revenue Generated" },
  { key: "percentIncrease", label: "% Increase in Revenue" },
  { key: "certificatesIssued", label: "Certificates Issued" },
  { key: "renewalRate", label: "Renewal Rate (%)" },
  { key: "avgDuration", label: "Avg. Certificate Duration" },
  { key: "expirationRate", label: "Expiration Rate (%)" },
  { key: "avgRevenuePerCert", label: "Avg. Revenue per Certificate" },
];

function formatCurrency(num) {
  return "$" + num.toLocaleString();
}

function Certificates() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({});

  // Sorting toggle
  function onSort(key) {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        setSortConfig({ key, direction: "desc" });
      } else if (sortConfig.direction === "desc") {
        setSortConfig({ key: null, direction: null });
      } else {
        setSortConfig({ key, direction: "asc" });
      }
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  }

  // Filter handler
  function onFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const filteredSortedData = useMemo(() => {
    let filtered = [...certificateTableData];

    // Apply filters
    filtered = filtered.filter((item) =>
      Object.entries(filters).every(([key, val]) => {
        if (!val) return true;
        let itemValue = item[key];
        if (typeof itemValue === "number") itemValue = itemValue.toString();
        return itemValue.toLowerCase().includes(val.toLowerCase());
      })
    );

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [filters, sortConfig]);

  // Export CSV function
  function exportCSV() {
    const headers = columns.map((c) => c.label).join(",");
    const rows = filteredSortedData.map((row) =>
      columns
        .map((col) =>
          col.key === "revenueGenerated" || col.key === "avgRevenuePerCert"
            ? formatCurrency(row[col.key])
            : row[col.key]
        )
        .join(",")
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "certificate_report.csv";
    link.click();
  }

  return (
    <div className="certificates-container" style={{ margin: "0 20px" }}>
      <h2>Certificate Distribution</h2>
      <p>Status overview across all companies</p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={certificatePieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {certificatePieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, `${name} Certificates`]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Certificate Analytics</h3>
          <button className="export-btn" onClick={exportCSV}>
            Export Report
          </button>
        </div>

        <table className="certificates-table">
          <thead>
            <tr>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {label}
                </th>
              ))}
            </tr>
            <tr>
              {columns.map(({ key }) => (
                <th key={key}>
                  {activeFilter === key && (
                    <input
                      type="text"
                      placeholder={`Search ${key}`}
                      value={filters[key] || ""}
                      onChange={(e) => onFilterChange(key, e.target.value)}
                      style={{ width: "100%", padding: "6px 8px", fontSize: 12 }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
                  No results found.
                </td>
              </tr>
            ) : (
              filteredSortedData.map((row) => (
                <tr key={row.certificateType}>
                  <td>{row.certificateType}</td>
                  <td>{formatCurrency(row.revenueGenerated)}</td>
                  <td style={{ color: row.percentIncrease >= 0 ? "green" : "red" }}>
                    {row.percentIncrease > 0 ? "+" : ""}
                    {row.percentIncrease}%
                  </td>
                  <td>{row.certificatesIssued.toLocaleString()}</td>
                  <td>{row.renewalRate}%</td>
                  <td>{row.avgDuration}</td>
                  <td>{row.expirationRate}%</td>
                  <td>{formatCurrency(row.avgRevenuePerCert)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Certificates;
