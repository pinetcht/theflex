import "../../styles/PropertyPage.css";

function ImageGallery() {
  return (
    <div className="imageDisplay">
      <div className="leftDisplay">
        <img src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-113668-zwA3iFfVXGOEF--6FtZCaKqqthoBFPQ0qEj0ccCEAp0E-6633644486862" />
      </div>
      <div className="gridDisplay">
        {Array.from({ length: 4 }).map((_, i) => (
          <img
            key={i}
            src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-113668-zwA3iFfVXGOEF--6FtZCaKqqthoBFPQ0qEj0ccCEAp0E-6633644486862"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
