import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aggregateProperties } from '../utils/aggregateProperties';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useSort } from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import "../styles/Dashboard.css"
import axios from 'axios';



const Dashboard = () => {
    const [reviews, setReviews] = useState([]);
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reviews');
                setReviews(response.data.reviews);
            } catch (err) {
                console.error('Error fetching reviews:', err);
                throw err;
            }
        };
        fetchReviews();
    }, []);


    useEffect(() => {
        console.log(reviews)
        console.log(reviews.length)
        if (reviews.length > 0) {
            const aggregated = aggregateProperties(reviews);
            setProperties(aggregated);
        }
    }, [reviews]);


    useEffect(() => {
        console.log(properties)
    }, [properties]);

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
        { nodes: properties },
        {
            onChange: onSortChange,
        },
        {
            sortFns: {
                NAME: (array) => array.sort((a, b) => a.listingName.localeCompare(b.listingName)),
                REVIEWS: (array) => array.sort((a, b) => a.totalReviews - b.totalReviews),
                AVG: (array) => array.sort((a, b) => a.averageRating - b.averageRating),
            },
        }
    );

    function onSortChange(action, state) {
        console.log(action, state);
    }



    const COLUMNS = [
        { label: 'Listing Name', renderCell: (item) => item.listingName, sort: { sortKey: "NAME" } },
        { label: 'Total Reviews', renderCell: (item) => item.totalReviews, sort: { sortKey: "REVIEWS" } },
        { label: 'Average Ratings', renderCell: (item) => item.averageRating, sort: { sortKey: "AVG" } }
    ];


    return (
        <CompactTable
            columns={COLUMNS}
            data={{ nodes: properties }}
            sort={sort}
            theme={theme}
            rowProps={{
                onClick: (item) => navigate(`/property/${item.listingName}`),
                className: 'table-row',
            }}
        />
    );
};


export default Dashboard;
