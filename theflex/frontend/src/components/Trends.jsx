import React from "react";

const Trends = () => {
  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h2>Trends & Recurring Issues</h2>
      <ul>
        <li>📈 Ratings trending up in last quarter</li>
        <li>⚠️ "Noise" mentioned 12 times this month</li>
        <li>👍 "Staff friendliness" trending positive</li>
      </ul>
    </div>
  );
};

export default Trends;
