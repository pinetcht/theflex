import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@table-library/react-table-library/theme";
import { useSort } from "@table-library/react-table-library/sort";
import { CompactTable } from '@table-library/react-table-library/compact';
import "../styles/PropertyPage.css"

function PropertyPage() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const channelNames = {
    2001: "Google",
    2002: "Booking.com",
    2003: "AirBnb"
  }
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyReviews = async () => {
      const res = await axios.get(`http://localhost:3000/api/reviews/${id}`);
      setReviews(res.data.result);
    };
    fetchPropertyReviews();
  }, [id]);

  useEffect(() => {
    console.log(reviews)
  }, [reviews]);


  const theme = useTheme({
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
    BaseCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        padding: 8px 16px;
      `,
  });

  const sort = useSort(
    { nodes: reviews },
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        RATING: (array) => array.sort((a, b) => a.rating - b.rating),
        CHANNEL: (array) => array.sort((a, b) => channelNames[a.channelId].localeCompare(channelNames[b.channelId])),
        DATE: (array) =>
          array.sort(
            (a, b) =>
              new Date(a.departureDate) - new Date(b.departureDate) // ✅ numeric date comparison
          ),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }


  const COLUMNS = [
    { label: 'Review', renderCell: (item) => item.publicReview || item.privateFeedback || '' },
    { label: 'Ratings', renderCell: (item) => item.rating, sort: { sortKey: "RATING" } },
    { label: 'Channel', renderCell: (item) => channelNames[item.channelId], sort: { sortKey: "CHANNEL" } },
    {
      label: 'Date', renderCell: (item) => item.departureDate.split(" ")[0],
      sort: { sortKey: "DATE" }
    },
    {
      label: 'Add to Public', renderCell: () =>
      <button className="addtoSite" onClick={ () => console.log('hello')}>
        click me
      </button>,
    }
  ];


  return (
    <div>
      <div className="backbutton" onClick={() => navigate('/')}>Back to Dashboard</div>
      <h2>Property Reviews</h2>

      <h3>{reviews.length > 0 ? reviews[0].listingName : ""}</h3>

      <CompactTable
        columns={COLUMNS}
        data={{ nodes: reviews }}
        sort={sort}
        theme={theme}
      />
    </div>
  );
}

export default PropertyPage;
