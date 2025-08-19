import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header";
import KPI from "../components/KPI";
import Trends from "../components/Trends";
import ReviewTable from "../components/ReviewTable";
import PublicPreview from "../components/PublicPreview";
import { aggregateProperties } from '../utils/aggregateProperties';
import Dashboard from "../components/Dashboard";

function Homepage() {

    const propertiesData = [
        { id: 1, name: "Property A", avgRating: 4.3, category: "Hotel", channel: "Google", lastReviewDate: "2025-08-01" },
        { id: 2, name: "Property B", avgRating: 3.9, category: "Resort", channel: "Booking.com", lastReviewDate: "2025-07-29" },
    ];


    const [filters, setFilters] = useState({ property: "All", channel: "All", date: "" });
    const [properties, setProperties] = useState([]);
    const [reviews, setReviews] = useState([]);

    const toggleDisplay = (id) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, display: !r.display } : r));
    };




    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reviews');
            setReviews(response.data.reviews);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);


    useEffect(() => {
        if (reviews.length > 0) {
            const aggregated = aggregateProperties(reviews);
            setProperties(aggregated);
        }
    }, [reviews]);



    return (
        <div>
            <h1>The Flex</h1>
            <Header reviews={reviews} propertiesData={properties} filters={filters} setFilters={setFilters} />

            <div className="container">
                {/* KPIs for all properties */}
                <KPI properties={properties} />

                {/* Trends component, can show recurring issues or average ratings */}
                <Trends properties={properties} />

                {/* Dashboard per-property */}
                <Dashboard />

                {/* Public preview of reviews marked for display */}
                <PublicPreview reviews={reviews.filter((r) => r.display)} />
            </div>
        </div>

    );
}

export default Homepage;
