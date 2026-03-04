// src/components/Sidebar.js
import React from "react";
import {
  MdDashboard,
  MdBusiness,
  MdVerifiedUser,
  MdShowChart,
  MdSmartToy,
  MdGavel,
  MdPeople,
} from "react-icons/md";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <MdDashboard size={20} /> },
  { id: "companies", label: "Companies", icon: <MdBusiness size={20} /> },
  { id: "certificates", label: "Certificates", icon: <MdVerifiedUser size={20} /> },
  { id: "revenue", label: "Revenue Analytics", icon: <MdShowChart size={20} /> },
  { id: "rc", label: "Renewed Certificates", icon: <MdSmartToy size={20} /> },
  { id: "compliance", label: "Compliance", icon: <MdGavel size={20} /> },
  { id: "users", label: "Users", icon: <MdPeople size={20} /> },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="logo">Digi Insights</div>
      <nav className="menu">
        {menuItems.map(({ id, label, icon }) => (
          <div
            key={id}
            className={`menu-item ${activePage === id ? "active" : ""}`}
            onClick={() => setActivePage(id)}
          >
            <span className="icon">{icon}</span>
            {label}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;