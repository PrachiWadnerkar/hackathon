import React, { useState, useMemo } from "react";
import { MdBusiness, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const companiesData = [
  {
    id: 1,
    name: "TechCorp International",
    industry: "Technology",
    revenue: 1250000,
    certificates: 342,
    complianceScore: 98,
    salesRep: {
      name: "Alice Morgan",
      phone: "+1-555-123-4567",
      email: "alice.morgan@techcorp.com",
    },
    certificateTypes: ["OV", "EV"],
    contractType: "Yearly",
    expirationDate: "2024-11-30",
  },
  {
    id: 2,
    name: "GlobalSoft Solutions",
    industry: "Software",
    revenue: 980000,
    certificates: 278,
    complianceScore: 95,
    salesRep: {
      name: "Bob Smith",
      phone: "+1-555-987-6543",
      email: "bob.smith@globalsoft.com",
    },
    certificateTypes: ["EV"],
    contractType: "Monthly",
    expirationDate: "2024-08-15",
  },
  {
    id: 3,
    name: "DataSys Enterprise",
    industry: "Data Analytics",
    revenue: 760000,
    certificates: 193,
    complianceScore: 90,
    salesRep: {
      name: "Cathy Lee",
      phone: "+1-555-234-5678",
      email: "cathy.lee@datasys.com",
    },
    certificateTypes: ["DV"],
    contractType: "Yearly",
    expirationDate: "2025-02-28",
  },
];

function formatCurrency(num) {
  return "$" + num.toLocaleString();
}

function formatDate(dateStr) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

const columns = [
  { key: "name", label: "COMPANY" },
  { key: "industry", label: "INDUSTRY" },
  { key: "revenue", label: "REVENUE" },
  { key: "certificates", label: "CERTIFICATES" },
  { key: "complianceScore", label: "COMPLIANCE SCORE" },
  { key: "salesRep", label: "SALES REP" },
  { key: "certificateTypes", label: "CERTIFICATE TYPE" },
  { key: "contractType", label: "CONTRACT TYPE" },
  { key: "expirationDate", label: "EXPIRATION DATE" },
];

function Companies() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); 
  const [activeFilter, setActiveFilter] = useState(null); 
  const [filters, setFilters] = useState({});

  // Toggle sort for a column
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

  // Handle filter input change
  function onFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  // Filter and sort the data memoized
  const filteredSortedData = useMemo(() => {
    let filtered = [...companiesData];

    // Apply filters
    filtered = filtered.filter((item) => {
      return Object.entries(filters).every(([key, val]) => {
        if (!val) return true;

        let itemValue = item[key];
        if (key === "salesRep") {
          // For salesRep filter, check name, phone, or email fields
          const searchVal = val.toLowerCase();
          return (
            itemValue.name.toLowerCase().includes(searchVal) ||
            itemValue.phone.toLowerCase().includes(searchVal) ||
            itemValue.email.toLowerCase().includes(searchVal)
          );
        }
        if (key === "certificateTypes") {
          return itemValue.some((cert) =>
            cert.toLowerCase().includes(val.toLowerCase())
          );
        }
        if (key === "expirationDate") {
          return formatDate(itemValue)
            .toLowerCase()
            .includes(val.toLowerCase());
        }
        
        return itemValue
          .toString()
          .toLowerCase()
          .includes(val.toLowerCase());
      });
    });

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Special cases for sorting:
        if (sortConfig.key === "salesRep") {
          aVal = aVal.name.toLowerCase();
          bVal = bVal.name.toLowerCase();
        } else if (sortConfig.key === "certificateTypes") {
          aVal = aVal.join(", ").toLowerCase();
          bVal = bVal.join(", ").toLowerCase();
        } else if (sortConfig.key === "expirationDate") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else if (typeof aVal === "string") {
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

  return (
    <div className="companies-container">
      <div className="header-row">
        <div>
          <h2>Company Overview</h2>
          <p className="subtitle">Monitor all companies and their compliance status</p>
        </div>
        <button className="export-btn">Export Report</button>
      </div>

      <table className="companies-table">
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => {
                  setActiveFilter(activeFilter === key ? null : key);
                  onSort(key);
                }}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span>{label}</span>
                  {sortConfig.key === key ? (
                    sortConfig.direction === "asc" ? (
                      <MdArrowDropUp />
                    ) : sortConfig.direction === "desc" ? (
                      <MdArrowDropDown />
                    ) : null
                  ) : null}
                </div>
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
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      fontSize: 12,
                      boxSizing: "border-box",
                    }}
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
            filteredSortedData.map((company) => (
              <tr key={company.id}>
                <td className="company-name-cell">
                  <span className="company-icon">
                    <MdBusiness size={20} color="#2E4A90" />
                  </span>
                  <strong>{company.name}</strong>
                </td>
                <td>{company.industry}</td>
                <td className="revenue-cell" style={{ color: "#2E8B57" }}>
                  &#x2197; {formatCurrency(company.revenue)}
                </td>
                <td>{company.certificates} certs</td>
                <td className="compliance-score" style={{ color: "#2E8B57" }}>
                  {company.complianceScore}%
                </td>
                <td>
                  <div>{company.salesRep.name}</div>
                  <div className="sales-contact">{company.salesRep.phone}</div>
                  <div className="sales-contact">{company.salesRep.email}</div>
                </td>
                <td>{company.certificateTypes.join(", ")}</td>
                <td>{company.contractType}</td>
                <td>{formatDate(company.expirationDate)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Companies;
