// utils/reviewUtils.js
export function aggregateProperties(reviews) {
    const aggregated = Object.values(
        reviews.reduce((acc, r) => {
            if (!acc[r.listingName]) acc[r.listingName] = {
                listingMapId: r.listingMapId,
                listingName: r.listingName,
                totalReviews: 0,
                sumRating: 0
            };
            acc[r.listingName].totalReviews += 1;
            acc[r.listingName].sumRating += r.rating || 0;
            return acc;
        }, {})
    );

    return aggregated.map((property, index) => ({
        listingMapId: index, // or property.listingMapId if you want original
        listingName: property.listingName,
        totalReviews: property.totalReviews,
        averageRating: property.totalReviews > 0 ? property.sumRating / property.totalReviews : 0
    }));
}
