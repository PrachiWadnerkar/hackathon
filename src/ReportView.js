import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function ReportView({ report, period, setPeriod }) {

  const [data, setData] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const endpoint =
      report === "company"
        ? "company-revenue"
        : "cert-revenue";

    axios
      .get(`http://localhost:8080/api/reports/${endpoint}?period=${period}`)
      .then(res => {
        setData(res.data.data);
        setLabel(res.data.label);
      });
  }, [report, period]);

  return (
    <div className="report">
      <h2>{label}</h2>

      <div className="filters">
        {["6m", "1y", "2y", "3y"].map(p => (
          <button
            key={p}
            className={period === p ? "active-btn" : ""}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#0073cf" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReportView;