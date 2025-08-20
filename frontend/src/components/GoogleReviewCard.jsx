/* src/components/GoogleReviewCard.jsx */
function GoogleReviewCard({ review }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        background: "#fff",
        margin: "0.5rem"
      }}
    >
      <h4 style={{ margin: "0 0 0.5rem 0" }}>{review.placeName}</h4>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>{review.address}</p>
      <p style={{ margin: "0.5rem 0" }}>
        <strong>Rating:</strong> {"⭐".repeat(review.rating)}
      </p>
      <p style={{ fontStyle: "italic" }}>"{review.text}"</p>
      <p style={{ marginTop: "0.5rem" }}>
        —{" "}
        <a href={review.authorUri} target="_blank" rel="noopener noreferrer">
          {review.authorName}
        </a>
      </p>
    </div>
  );
}

export default GoogleReviewCard;
