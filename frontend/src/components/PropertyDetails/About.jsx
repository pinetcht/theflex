import "../../styles/PropertyPage.css";

function About( { details } ) {
  return (
    <div className="card about">
      <h2>About this property</h2>
      { details }
    </div>
  );
}

export default About;
