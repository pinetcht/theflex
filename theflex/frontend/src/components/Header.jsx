import React from "react";

const Header = ({ filters, setFilters }) => {
  return (
    <header style={{ background: "#2c3e50", color: "white", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Manager Dashboard</h1>
      <div>
        <select value={filters.property} onChange={e => setFilters({...filters, property: e.target.value})}>
          <option>All Properties</option>
          <option>Property A</option>
          <option>Property B</option>
        </select>
        <select value={filters.channel} onChange={e => setFilters({...filters, channel: e.target.value})}>
          <option>All Channels</option>
          <option>Google</option>
          <option>Booking.com</option>
        </select>
        <input type="date" value={filters.date} onChange={e => setFilters({...filters, date: e.target.value})} />
      </div>
    </header>
  );
};

export default Header;
