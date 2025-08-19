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

function normalizeReviews(rawReviews) {
    return rawReviews.map(review => ({
        listing: review.listingName || 'Unknown',
        type: review.type || 'guest-to-host',
        channel: review.channelId ? `Channel ${review.channelId}` : 'unknown',
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

        const normalized = normalizeReviews(reviews);
        res.json({ reviews: normalized });
    });
});


// Get reviews by property/listingMapId
app.get('/api/reviews/:listing', (req, res) => {
    const listingName = req.params.listing;

    console.log(listingName)
    const allReviews = JSON.parse(fs.readFileSync(MOCK_JSON_PATH, 'utf8')).result;

    const propertyReviews = allReviews.filter(
        r => r.listingName == listingName
    );

    console.log(propertyReviews)

    res.json({ status: 'success', result: propertyReviews });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
