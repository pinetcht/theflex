import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const properties = Object.values(
        reviews.reduce((acc, r) => {
            if (!acc[r.listing]) acc[r.listing] = {
                listingMapId: r.mapId,
                listingName: r.listing,
                totalReviews: 0,
                sumRating: 0
            };
            acc[r.listing].totalReviews += 1;
            acc[r.listing].sumRating += r.rating || 0;
            return acc;
        }, {})
    ).map((property, index) => ({
        listingMapId: index,
        listingName: property.listingName,
        totalReviews: property.totalReviews,
        averageRating: property.totalReviews > 0 ? property.sumRating / property.totalReviews : 0
    }));

    console.log(properties)

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
