import React from "react";

const PublicPreview = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div
        style={{
          gridColumn: "span 2",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Public Website Preview</h2>
        <p>No reviews selected for public display.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        gridColumn: "span 2",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        borderLeft: "3px solid #2c3e50",
      }}
    >
      <h2>Public Website Preview</h2>
      {reviews.map((r) => (
        <blockquote key={r.id} style={{ marginBottom: "10px" }}>
          “{r.publicReview}” – {"⭐".repeat(r.rating)}
        </blockquote>
      ))}
    </div>
  );
};

export default PublicPreview;
