import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header";
import KPI from "../components/KPI";
import Trends from "../components/Trends";
import PublicPreview from "../components/PublicPreview";
import LineChartCard from "../components/LineChartCard";
import BarChartCard from "../components/BarChartCard";
import { aggregateProperties } from '../utils/aggregateProperties';
import { processChartData } from '../utils/processChartData';
import Dashboard from "../components/Dashboard";

function Homepage() {


    const [filters, setFilters] = useState({
        property: "All", channel: "All", startDate: "",
        endDate: ""
    });
    const [properties, setProperties] = useState([]);
    const [reviews, setReviews] = useState([]);
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

            const response = await axios.get("http://localhost:3000/api/reviews", { params });
            setReviews(response.data.reviews);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };



    useEffect(() => {
        fetchReviews();
        console.log(filters)
    }, [filters]);



    useEffect(() => {
        if (reviews.length > 0) {
            const aggregated = aggregateProperties(reviews);
            setProperties(aggregated);
        }
    }, [reviews]);

    const { ratingsTrend, reviewCount } = processChartData(reviews);


    return (
        <div>
            <h1>The Flex</h1>
            <Header reviews={reviews} filters={filters} setFilters={setFilters} />

            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <LineChartCard title="Average Rating Over Time" data={ratingsTrend} dataKey="rating" />
                    <BarChartCard title="Total Reviews per Property" data={reviewCount} dataKey="count" />
                </div>
                {/* KPIs for all properties */}
                <KPI properties={properties} />

                {/* Dashboard per-property */}
                <Dashboard properties={reviews} />

                {/* Public preview of reviews marked for display */}
                <PublicPreview reviews={reviews && reviews.filter((r) => r.display)} />
            </div>
        </div>

    );
}

export default Homepage;
