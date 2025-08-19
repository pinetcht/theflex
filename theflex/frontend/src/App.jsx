// import React, { useState, useEffect } from "react";
// import Header from "./components/Header";
// import KPI from "./components/KPI";
// import Trends from "./components/Trends";
// import ReviewTable from "./components/ReviewTable";
// import PublicPreview from "./components/PublicPreview";
// import axios from 'axios';

// const propertiesData = [
//   { id: 1, name: "Property A", avgRating: 4.3, category: "Hotel", channel: "Google", lastReviewDate: "2025-08-01" },
//   { id: 2, name: "Property B", avgRating: 3.9, category: "Resort", channel: "Booking.com", lastReviewDate: "2025-07-29" },
// ];


// function App() {

//   const [filters, setFilters] = useState({ property: "All", channel: "All", date: "" });

//   const toggleDisplay = (id) => {
//     setReviews(reviews.map(r => r.id === id ? { ...r, display: !r.display } : r));
//   };

//   const [reviews, setReviews] = useState([]);


//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/reviews');
//       setReviews(response.data.reviews);
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   useEffect(() => {
//     console.log(reviews)
//   }, [reviews]);

//   return (
//     <div>
//       <Header filters={filters} setFilters={setFilters} />
//       <div className="container">
//         <KPI properties={propertiesData} />
//         <Trends />
//         <ReviewTable reviews={reviews} toggleDisplay={toggleDisplay} />
//         <PublicPreview reviews={reviews.filter(r => r.display)} />
//       </div>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './roots/Dashboard';
import PropertyPage from './components/PropertyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
