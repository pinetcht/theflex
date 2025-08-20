// Transform reviews for charts
export const processChartData = ( reviews ) => {

  // Average rating over time (per day)
  const ratingByDate = {};
  reviews.forEach(r => {
    const day = r.arrivalDate.slice(0, 10); // YYYY-MM-DD
    if (!ratingByDate[day]) ratingByDate[day] = { sum: 0, count: 0 };
    ratingByDate[day].sum += r.rating || 0;
    ratingByDate[day].count += 1;
  });

  const ratingsTrend = Object.entries(ratingByDate).map(([day, { sum, count }]) => ({
    name: day,
    rating: count ? sum / count : 0
  }));

  // Total reviews per property
  const reviewsByProperty = {};
  reviews.forEach(r => {
    if (!reviewsByProperty[r.listingName]) reviewsByProperty[r.listingName] = 0;
    reviewsByProperty[r.listingName] += 1;
  });

  const reviewCount = Object.entries(reviewsByProperty).map(([name, count]) => ({
    name,
    count
  }));

  return { ratingsTrend, reviewCount };
};
