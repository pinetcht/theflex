import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PropertyPage() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchPropertyReviews = async () => {
      const res = await axios.get(`http://localhost:3000/api/reviews/${id}`);
      setReviews(res.data.result);
    };
    fetchPropertyReviews();
  }, [id]);

  return (
    <div>
      <h2>Property Reviews</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Guest</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Public?</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(r => (
            <tr key={r.mapId}>
              <td>{r.guestName}</td>
              <td>{r.rating || 'N/A'}</td>
              <td>{r.publicReview || r.privateFeedback || '-'}</td>
              <td>
                <input type="checkbox" defaultChecked={r.status === 'published'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyPage;
