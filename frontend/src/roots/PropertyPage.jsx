
import { mockProperties } from "../utils/mockProperties";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PropertyHeader from "../components/PropertyDetails/PropertyHeader";
import ImageGallery from "../components/PropertyDetails/ImageGallery";
import Overview from "../components/PropertyDetails/Overview";
import About from "../components/PropertyDetails/About";
import Amenities from "../components/PropertyDetails/Amenities";
import StayPolicies from "../components/PropertyDetails/StayPolicies";
import Location from "../components/PropertyDetails/Location";
import Reviews from "../components/PropertyDetails/Reviews";

import "../styles/PropertyPage.css";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function PropertyPage() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    const fetchPropertyReviews = async () => {
      const params = {};
      params.property = id;
      const res = await axios.get(`${API_BASE}/api/reviews`, { params });
      setReviews(res.data.reviews);

    };

    fetchPropertyReviews();
    const property = mockProperties.find((p) => p.name === id);
    setPropertyData(property);
  }, [id]);



  useEffect(() => {
    console.log(propertyData)
  }, [propertyData])

  useEffect(() => {
    console.log(reviews)
  }, [reviews])



  return (
    <div>
      <PropertyHeader name={id} />
      <ImageGallery />

      <div className="content">
      <h1>{id}</h1>

      <div>
        
      </div>

        {propertyData !== null ? (
          <>
            <Overview overview={propertyData.overview} />
            <About details={propertyData.about} />
            <Amenities amenities={propertyData.amenities} />
            <StayPolicies policies={propertyData.stayPolicies} />
            <Location />
            
          </>
        ) : (
          <p>Loading property details...</p>
        )}

        <Reviews reviews={reviews.filter((r) => r.display)} />
        
      </div>


    </div>
  );
}

export default PropertyPage;
