import "../../styles/PropertyPage.css";

function Overview({ overview }) {

  return (
    <div className="overview">
      {Object.entries(overview).map(([key, value], i) => (
        <div key={i} className="detail">
          <img src="https://www.svgrepo.com/show/501495/check-mark.svg" />
          <div className="detailText">
            {value} <br /> {key}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Overview;
