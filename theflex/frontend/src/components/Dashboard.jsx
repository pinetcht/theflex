import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aggregateProperties } from '../utils/aggregateProperties';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useSort } from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import "../styles/Dashboard.css"
import axios from 'axios';



const Dashboard = (selectedProperty) => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const channelNames = {
        2001: "Google",
        2002: "Booking.com",
        2003: "AirBnb"
    }

    useEffect(() => {
        console.log(selectedProperty.properties)
    }, [selectedProperty]);

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
        { nodes: selectedProperty.properties },
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
        { label: 'Property', renderCell: (item) => item.listingName || '' },
        { label: 'Review', renderCell: (item) => (<div className="reviewCell"> {item.publicReview || item.privateFeedback || '' }</div>) },
        { label: 'Ratings', renderCell: (item) => item.rating, sort: { sortKey: "RATING" } },
        { label: 'Channel', renderCell: (item) => channelNames[item.channelId], sort: { sortKey: "CHANNEL" } },
        {
            label: 'Date', renderCell: (item) => item.departureDate.split(" ")[0],
            sort: { sortKey: "DATE" }
        },
        {
            label: 'Add to Public', renderCell: () =>
                <button className="addtoSite" onClick={() => console.log('hello')}>
                    click me
                </button>,
        }
    ];


    return (
        <div>

            <CompactTable
                columns={COLUMNS}
                data={{ nodes: selectedProperty.properties }}
                sort={sort}
                theme={theme}
            />
        </div>
    );
};



export default Dashboard;
