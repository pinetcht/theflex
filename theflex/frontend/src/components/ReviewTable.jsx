import React, { useState } from "react";

const ReviewTable = ({ reviews, toggleDisplay }) => {
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  const sortedReviews = [...reviews].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ gridColumn: "span 2", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h2>Review Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th onClick={() => requestSort("date")}>Date</th>
            <th onClick={() => requestSort("channel")}>Channel</th>
            <th onClick={() => requestSort("rating")}>Rating</th>
            <th>Review</th>
            <th>Display on Website</th>
          </tr>
        </thead>
        <tbody>
          {sortedReviews.map(r => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.channel}</td>
              <td>{"⭐".repeat(r.rating)}</td>
              <td>{r.text}</td>
              <td><input type="checkbox" checked={r.display} onChange={() => toggleDisplay(r.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
