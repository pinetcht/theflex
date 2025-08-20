import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LineChartCard = ({ title, data, dataKey, color = "#3498db" }) => {
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;
