import { useNavigate } from "react-router-dom";
import "../../styles/PropertyPage.css";

function PropertyHeader() {
  const navigate = useNavigate();

  return (
    <div className="header">

      <div className="backbutton" onClick={() => navigate("/")}>
        <h3 style={{margin:"0px"}}>Back to The Flex Manager Dashboard</h3>
      </div>
    </div>
  );
}

export default PropertyHeader;
