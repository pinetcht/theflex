import "../../styles/PropertyPage.css";

function StayPolicies({ policies }) {

  console.log(policies)
  return (
    <div className="card stay">
      <h2>Stay Policies</h2>

      <div className="subRules">
        <h3>Check-in & Check-out</h3>
        <div className="subSubRulesContainer">
          <div className="subSubRules">Check-in time <br /> {policies.arrivalDepartures.checkIn}</div>
          <div className="subSubRules">Check-out time <br /> {policies.arrivalDepartures.checkOut}</div>
        </div>
      </div>

      <div className="subRules">
        <h3>House Rules</h3>
        <div className="subSubRulesContainer rules">
          {policies.houseRules.map((r, i) => (
            <div key={i} className="subSubRules rules">{r}</div>
          ))}
        </div>
      </div>

      <div className="subRules cancel">
        <h3>Cancellation Policy</h3>
        <div className="subSubRulesContainer cancel">
          {Object.entries(policies.cancellationPolicy).map(([key, rules], i) => (
            <div key={i} className="subSubRules cancel">
              <strong>{key === "lessThan28Days" ? "Less than 28 days" : "More than 28 days"}</strong>
              <ul>
                {rules.map((rule, j) => (
                  <li key={j}>{rule}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StayPolicies;
