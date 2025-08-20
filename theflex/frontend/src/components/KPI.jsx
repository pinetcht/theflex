import React from "react";

const KPI = ({ properties }) => {
  // Calculate overall KPIs (example: average rating, total reviews, trend)
  
  const totalReviews = (properties.reduce((sum, p) => sum + p.totalReviews, 0));; // Example static number
  const avgRating = (properties.reduce((sum, p) => sum + p.averageRating, 0) / properties.length).toFixed(1);
  // const trend = "↑ 5%"; // Example trend

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
      </div>
    </div>
  );
};

export default KPI;
