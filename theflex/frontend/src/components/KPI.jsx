import React from "react";

const KPI = ({ properties }) => {
  // Calculate overall KPIs (example: average rating, total reviews, trend)
  const avgRating = (properties.reduce((sum, p) => sum + p.avgRating, 0) / properties.length).toFixed(1);
  const totalReviews = properties.length * 50; // Example static number
  const trend = "↑ 5%"; // Example trend

  return (
    <div style={{ background: "#ecf0f1", borderRadius: "6px", padding: "15px", textAlign: "center" }}>
      <h2>Performance Summary</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <div style={{ flex: 1 }}>
          <h3>⭐ {avgRating}</h3>
          <p>Avg. Rating</p>
        </div>
        <div style={{ flex: 1 }}>
          <h3>{totalReviews}</h3>
          <p>Reviews (Last 30d)</p>
        </div>
        <div style={{ flex: 1 }}>
          <h3>{trend}</h3>
          <p>Trend</p>
        </div>
      </div>
    </div>
  );
};

export default KPI;
