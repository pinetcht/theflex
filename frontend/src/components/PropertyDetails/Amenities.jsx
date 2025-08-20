import "../../styles/PropertyPage.css";

function Amenities( {amenities}) {

  return (
    <div className="card amenity">
      <h2>Amenities</h2>
      <div className="amenities">
        {amenities.map((a, i) => (
          <div key={i} className="detail">
            <img src="https://www.svgrepo.com/show/501495/check-mark.svg" />
            <div className="detailText">{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Amenities;
