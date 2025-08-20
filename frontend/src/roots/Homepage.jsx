import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import KPI from "../components/KPI";
import PublicPreview from "../components/PublicPreview";
import LineChartCard from "../components/LineChartCard";
import BarChartCard from "../components/BarChartCard";
import GoogleReviewCard from "../components/GoogleReviewCard";
import { aggregateProperties } from '../utils/aggregateProperties';
import { processChartData } from '../utils/processChartData';
import Dashboard from "../components/Dashboard";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

import "../styles/Homepage.css"

function Homepage() {


    const [filters, setFilters] = useState({
        property: "All", channel: "All", startDate: "",
        endDate: ""
    });
    const [properties, setProperties] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [googleReviews, setGoogleReviews] = useState([]);

    const toggleDisplay = (id) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, display: !r.display } : r));
    };


    const fetchReviews = async () => {
        try {

            const params = {};

            if (filters.property !== "All") params.property = filters.property;
            if (filters.channel !== "All") params.channel = filters.channel;
            if (filters.startDate) params.startDate = filters.startDate;
            if (filters.endDate) params.endDate = filters.endDate;

            const response = await axios.get(`${API_BASE}/api/reviews`, { params });
            setReviews(response.data.reviews);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    useEffect(()=>{
        console.log(reviews)
    }, [reviews])


    const fetchGoogleReviews = async () => {
        try {
            const { Place } = await google.maps.importLibrary("places");

            const place = new Place({
                id: "ChIJpyiwa4Zw44kRBQSGWKv4wgA", // Faneuil Hall Marketplace, Boston, MA
            });

            await place.fetchFields({
                fields: ["displayName", "formattedAddress", "location", "reviews"],
            });

            if (place.reviews && place.reviews.length > 0) {
                const topReviews = place.reviews.slice(0, 5).map((r) => ({
                    placeName: place.displayName,
                    address: place.formattedAddress,
                    rating: r.rating,
                    text: r.text,
                    authorName: r.authorAttribution.displayName,
                    authorUri: r.authorAttribution.uri,
                }));


                setGoogleReviews(topReviews); // store in state
            } else {
                setGoogleReviews([]);
                console.log("No reviews found for", place.displayName);
            }
        } catch (err) {
            console.error("Error fetching Google reviews:", err);
        }
    };


    useEffect(() => {
        fetchReviews();
    }, [filters]);

    useEffect(() => {
        if (reviews.length > 0) {
            const aggregated = aggregateProperties(reviews);
            setProperties(aggregated);
            console.log(reviews)
        }
    }, [reviews]);

    const { ratingsTrend, average } = processChartData(reviews);


    return (
        <div>
            <Header reviews={reviews} filters={filters} setFilters={setFilters} />

            <div className="container">

                <KPI properties={properties} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <LineChartCard title="Average Rating Over Time" data={ratingsTrend} dataKey="rating" />
                    <BarChartCard title="Average Reviews per Property" data={average} dataKey="value" />
                </div>

                <Dashboard selectedProperty={reviews} setReviews={setReviews} />

                {/* Public preview of reviews marked for display */}
                <PublicPreview reviews={reviews.filter((r) => r.display)} />

                <div className="googleReview">
                    <h2>Google Reviews</h2>

                    <button className='googleReviewButton' onClick={fetchGoogleReviews}>Fetch Google Reviews</button>

                    {googleReviews.length > 0 && (
                        <div>
                            {googleReviews.map((review, idx) => (
                                <GoogleReviewCard key={idx} review={review} />
                            ))}
                        </div>
                    )}

                </div>

            </div>
        </div>

    );
}

export default Homepage;
