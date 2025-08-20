import "../../styles/PropertyPage.css";
import map from "../../assets/map.png";

function Location() {
  return (
    <div className="card location">
      <h3>Location</h3>
      <img src={map} />
    </div>
  );
}

export default Location;
