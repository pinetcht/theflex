import "../../styles/PropertyPage.css";

function Reviews({ reviews }) {
  return (
    <div className="card review">
      <h3>Reviews</h3>
      {reviews.map((r, i) => (
        <div key={i} className="subRules review">
          {r.guestName || "Anonymous"}
          <h3 style={{ margin: "2px" }}>
            {"★".repeat(r.rating || 0)}
          </h3>
          <div className="subSubRules review">{r.publicReview || ""}</div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
