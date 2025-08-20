const express = require('express');
const request = require('request');
const fs = require('fs');
require("dotenv").config();
var cors = require("cors");


const app = express();
app.use(cors());

const PORT = 3000;

const HOSTAWAY_API_KEY = process.env.API_KEY;
const HOSTAWAY_ACCOUNT_ID = process.env.ACCOUNT_ID;


const MOCK_JSON_PATH = './mock-reviews.json';
const channelNames = {
    2001: "Google",
    2002: "Booking.com",
    2003: "AirBnb"
}

function normalizeReviews(rawReviews) {
    return rawReviews.map(review => ({
        listing: review.listingName || 'Unknown',
        type: review.type || 'guest-to-host',
        channel: review.channelId ? channelNames[review.channelId] : 'unknown',
        rating: review.rating !== null ? review.rating : averageCategoryRating(review.reviewCategory),
        date: review.departureDate ? review.departureDate.split(' ')[0] : null,
        text: review.publicReview || review.privateFeedback || '',
        mapId: review.listingMapId,
        guestName: review.guestName || 'anonymous'
    }));
}

// Helper: calculate average of reviewCategory ratings if rating is null
function averageCategoryRating(categories) {
    if (!categories || !categories.length) return null;
    const sum = categories.reduce((acc, cat) => acc + (cat.rating || 0), 0);
    return Math.round(sum / categories.length);
}

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});



app.get('/api/reviews', (req, res) => {
    const options = {
        url: 'https://api.hostaway.com/v1/reviews',
        headers: {
            'Authorization': HOSTAWAY_API_KEY,
            'Account-Id': HOSTAWAY_ACCOUNT_ID
        },
        json: true // Automatically parses JSON response
    };



    request(options, (error, response, body) => {
        const { property, channel, startDate, endDate } = req.query;
        let reviews = [];

        if (!error && response.statusCode === 200) {
            reviews = body.result || [];
            if (!reviews.length) {
                console.log('Sandbox empty, loading mock reviews...');
                const mockData = fs.readFileSync(MOCK_JSON_PATH, 'utf8');
                reviews = JSON.parse(mockData).result || [];
            }
        } else {
            console.error('Error fetching reviews:', error || body);
            const mockData = fs.readFileSync(MOCK_JSON_PATH, 'utf8');
            reviews = JSON.parse(mockData).result || [];
        }

        if (property && property !== "All") {
            console.log(property)
            reviews = reviews.filter(r => r.listingName === property);
        }
        if (channel && channel !== "All") {
            console.log(channel)
            reviews = reviews.filter(r => channelNames[r.channelId] === channel);
        }
        if (startDate && endDate) {
            reviews = reviews.filter(r => new Date(startDate) <= new Date(r.departureDate) && new Date(r.departureDate) <= new Date(endDate));
        }

        if (startDate) {
            reviews = reviews.filter(r => new Date(startDate) <= new Date(r.departureDate)) ;
        }

        if (endDate) {
            reviews = reviews.filter(r => new Date(endDate) >= new Date(r.departureDate)) ;
        }

        // const normalized = normalizeReviews(reviews);
        res.json({ reviews: reviews });
    });
});


// Get reviews by property/listingMapId
app.get('/api/reviews/:listing', (req, res) => {
    const listingName = req.params.listing;
    const allReviews = JSON.parse(fs.readFileSync(MOCK_JSON_PATH, 'utf8')).result;

    const propertyReviews = allReviews.filter(
        r => r.listingName == listingName
    );

    res.json({ status: 'success', result: propertyReviews });
});



app.get('/api/channel/:channelName', (req, res) => {
    const channelName = req.params.channelName;
    const allReviews = JSON.parse(fs.readFileSync(MOCK_JSON_PATH, 'utf8')).result;

    const channel = allReviews.filter(r =>
        channelNames[r.channelId] == channelName
    );

    res.json({ status: 'success', result: channel });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
