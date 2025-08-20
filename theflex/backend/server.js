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

const PUBLIC_REVIEWS_PATH = './publicReviews.json';
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



// app.get('/api/reviews', (req, res) => {
//     const options = {
//         url: 'https://api.hostaway.com/v1/reviews',
//         headers: {
//             'Authorization': HOSTAWAY_API_KEY,
//             'Account-Id': HOSTAWAY_ACCOUNT_ID
//         },
//         json: true // Automatically parses JSON response
//     };



//     request(options, (error, response, body) => {
//         const { property, channel, startDate, endDate } = req.query;
//         let reviews = [];

//         if (!error && response.statusCode === 200) {
//             reviews = body.result || [];
//             if (!reviews.length) {
//                 console.log('Sandbox empty, loading mock reviews...');
//                 const mockData = fs.readFileSync(MOCK_JSON_PATH, 'utf8');
//                 reviews = JSON.parse(mockData).result || [];
//             }
//         } else {
//             console.error('Error fetching reviews:', error || body);
//             const mockData = fs.readFileSync(MOCK_JSON_PATH, 'utf8');
//             reviews = JSON.parse(mockData).result || [];
//         }

//         if (property && property !== "All") {
//             console.log(property)
//             reviews = reviews.filter(r => r.listingName === property);
//         }
//         if (channel && channel !== "All") {
//             console.log(channel)
//             reviews = reviews.filter(r => channelNames[r.channelId] === channel);
//         }
//         if (startDate && endDate) {
//             reviews = reviews.filter(r => new Date(startDate) <= new Date(r.departureDate) && new Date(r.departureDate) <= new Date(endDate));
//         }

//         if (startDate) {
//             reviews = reviews.filter(r => new Date(startDate) <= new Date(r.departureDate));
//         }

//         if (endDate) {
//             reviews = reviews.filter(r => new Date(endDate) >= new Date(r.departureDate));
//         }

//         // const normalized = normalizeReviews(reviews);
//         res.json({ reviews: reviews });
//     });
// });

// backend: /api/reviews/:id/publish

app.get('/api/reviews', (req, res) => {
    const options = {
        url: 'https://api.hostaway.com/v1/reviews',
        headers: {
            'Authorization': HOSTAWAY_API_KEY,
            'Account-Id': HOSTAWAY_ACCOUNT_ID
        },
        json: true
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

        // Add display field to every review
        reviews = reviews.map(r => ({ ...r, display: false }));

        // Merge in publicReviews
        let publicReviews = [];
        if (fs.existsSync(PUBLIC_REVIEWS_PATH)) {
            const content = fs.readFileSync(PUBLIC_REVIEWS_PATH, 'utf8').trim();
            if (content) {
                try {
                    publicReviews = JSON.parse(content);
                } catch (err) {
                    console.error('Error parsing publicReviews.json', err);
                }
            }
        }

        reviews = reviews.map(r => {
            const approved = publicReviews.find(pr => pr.id === r.id);
            return approved ? { ...r, display: approved.display } : r;
        });

        // Apply filters
        if (property && property !== "All") {
            reviews = reviews.filter(r => r.listingName === property);
        }
        if (channel && channel !== "All") {
            reviews = reviews.filter(r => channelNames[r.channelId] === channel);
        }
        if (startDate && endDate) {
            reviews = reviews.filter(r => new Date(startDate) <= new Date(r.departureDate) && new Date(r.departureDate) <= new Date(endDate));
        }
        if (startDate) {
            reviews = reviews.filter(r => new Date(startDate) <= new Date(r.departureDate));
        }
        if (endDate) {
            reviews = reviews.filter(r => new Date(endDate) >= new Date(r.departureDate));
        }

        res.json({ reviews });
    });
});



//     const reviewId = parseInt(req.params.id);

//     // Safely read publicReviews.json
//     let publicReviews = [];
//     if (fs.existsSync(PUBLIC_REVIEWS_PATH)) {
//         const content = fs.readFileSync(PUBLIC_REVIEWS_PATH, 'utf8').trim();
//         if (content) {
//             try {
//                 publicReviews = JSON.parse(content);
//             } catch (err) {
//                 console.error('Error parsing publicReviews.json, defaulting to empty array', err);
//                 publicReviews = [];
//             }
//         }
//     }

//     // Read all reviews (Hostaway/mock)
//     const allReviews = fs.existsSync(MOCK_JSON_PATH)
//         ? JSON.parse(fs.readFileSync(MOCK_JSON_PATH, 'utf8')).result
//         : [];

//     // Find the review to toggle
//     const review = allReviews.find(r => r.id === reviewId);
//     if (!review) return res.status(404).json({ error: 'Review not found' });

//     // Check if review is already in publicReviews
//     const existing = publicReviews.find(r => r.id === reviewId);

//     if (existing) {
//         // Toggle display
//         existing.display = !existing.display;
//     } else {
//         // Add new review as published
//         publicReviews.push({
//             id: review.id,
//             display: true,
//             publicReview: review.publicReview,
//             listingMapId: review.listingMapId
//         });
//     }

//     // Write updated publicReviews back to file
//     fs.writeFileSync(PUBLIC_REVIEWS_PATH, JSON.stringify(publicReviews, null, 2));

//     // Return updated review
//     res.json({
//         ...review,
//         display: existing ? existing.display : true,
//         publicReview: review.publicReview
//     });
// });




// Get reviews by property/listingMapId

app.post('/api/reviews/:id/publish', (req, res) => {
    const reviewId = parseInt(req.params.id);

    // Safely read publicReviews.json
    let publicReviews = [];
    if (fs.existsSync(PUBLIC_REVIEWS_PATH)) {
        const content = fs.readFileSync(PUBLIC_REVIEWS_PATH, 'utf8').trim();
        if (content) {
            try {
                publicReviews = JSON.parse(content);
            } catch (err) {
                console.error('Error parsing publicReviews.json, defaulting to empty array', err);
                publicReviews = [];
            }
        }
    }

    // Read all reviews (Hostaway/mock)
    const allReviews = fs.existsSync(MOCK_JSON_PATH)
        ? JSON.parse(fs.readFileSync(MOCK_JSON_PATH, 'utf8')).result
        : [];

    // Find the review to toggle
    const review = allReviews.find(r => r.id === reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    // Check if review is already in publicReviews
    let updatedDisplay = true;
    const existing = publicReviews.find(r => r.id === reviewId);

    if (existing) {
        // Toggle display
        existing.display = !existing.display;
        updatedDisplay = existing.display;
    } else {
        // Add new review as published
        publicReviews.push({
            id: review.id,
            display: true,
            publicReview: review.publicReview,
            listingMapId: review.listingMapId
        });
        updatedDisplay = true;
    }

    // Write updated publicReviews back to file
    fs.writeFileSync(PUBLIC_REVIEWS_PATH, JSON.stringify(publicReviews, null, 2));

    // Return updated review with display flag
    res.json({
        ...review,
        display: updatedDisplay,
        publicReview: review.publicReview
    });
});


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
