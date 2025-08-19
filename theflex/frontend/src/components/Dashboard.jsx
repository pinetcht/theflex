import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aggregateProperties } from '../utils/aggregateProperties';
import axios from 'axios';

function Dashboard() {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reviews');
                setReviews(response.data.reviews);
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        console.log(reviews)
    }, [reviews]);


    // Aggregate per property

    const properties = aggregateProperties(reviews);




    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Total Reviews</th>
                    <th>Average Rating</th>
                </tr>
            </thead>
            <tbody>
                {properties.map(p => (
                    <tr key={p.listingMapId} onClick={() => navigate(`/property/${p.listingName}`)}>
                        <td>{p.listingName}</td>
                        <td>{p.totalReviews}</td>
                        <td>{(p.averageRating).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Dashboard;
