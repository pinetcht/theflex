import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useSort } from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import axios from 'axios';
import "../styles/Dashboard.css"
const PUBLIC_REVIEWS_PATH = './data/publicReviews.json';


const Dashboard = ({ selectedProperty, setReviews }) => {
    const navigate = useNavigate();
    const channelNames = {
        2001: "Google",
        2002: "Booking.com",
        2003: "AirBnb"
    }

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
        { nodes: selectedProperty },
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
                            new Date(a.departureDate) - new Date(b.departureDate)
                    ),
            },
        }
    );

    function onSortChange(action, state) {
        console.log(action, state);
    }



    const addToPublic = async (review, onUpdate) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/reviews/${review.id}/publish`);
            const updatedReview = response.data;
            if (typeof onUpdate === 'function') {
                onUpdate(updatedReview);
            }
        } catch (err) {
            console.error('Error publishing review:', err);
        }
    };


    const handleReviewApproved = (updatedReview) => {
        setReviews(prevReviews =>
            prevReviews.map(r =>
                r.id === updatedReview.id ? updatedReview : r
            )
        );
    };


    const COLUMNS = [
        { label: 'Property', renderCell: (item) => item.listingName || '' },
        { label: 'Review', renderCell: (item) => (<div className="reviewCell"> {item.publicReview || item.privateFeedback || ''}</div>) },
        { label: 'Ratings', renderCell: (item) => item.rating, sort: { sortKey: "RATING" } },
        { label: 'Channel', renderCell: (item) => channelNames[item.channelId], sort: { sortKey: "CHANNEL" } },
        {
            label: 'Date', renderCell: (item) => item.departureDate.split(" ")[0],
            sort: { sortKey: "DATE" }
        },
        {
            label: 'Publish to Public', renderCell: (item) =>
                <button className="addtoSite" onClick={() => addToPublic(item, handleReviewApproved)}>
                    {item.display === true ? "Unpublish" : "Publish"}
                </button>,
        }
    ];


    return (
        <div>

            <CompactTable className="table"
                columns={COLUMNS}
                data={{ nodes: selectedProperty }}
                sort={sort}
                theme={theme}
                rowProps={{
                    onClick: (item) => navigate(`/property/${item.listingName}`),
                    className: 'table-row',
                }}
            />
        </div>
    );
};



export default Dashboard;
