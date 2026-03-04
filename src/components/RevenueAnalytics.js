import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 100000 },
  { month: "Feb", revenue: 120000 },
  { month: "Mar", revenue: 150000 },
  { month: "Apr", revenue: 170000 },
  { month: "May", revenue: 200000 },
];

function RevenueAnalytics() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "40px"   // added extra top margin
      }}
    >
      <div
        className="card"
        style={{
          width: "90%",
          maxWidth: "1600px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#ff7a00" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueAnalytics;