import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BarChartCard = ({ title, data, dataKey, color = "#2ecc71" }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "1rem",
        marginBottom: "1rem",
        minHeight: "300px",
      }}
    >
      <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
