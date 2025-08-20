import React from "react";

const Filters = ({ filters, setFilters, properties }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <select value={filters.property} onChange={e => setFilters({ ...filters, property: e.target.value })}>
        <option>All Properties</option>
        {properties.map(p => (
          <option key={p.id}>{p.name}</option>
        ))}
      </select>
      <select value={filters.channel} onChange={e => setFilters({ ...filters, channel: e.target.value })}>
        <option>All Channels</option>
        <option>Google</option>
        <option>Booking.com</option>
      </select>
      <input
        type="date"
        value={filters.date}
        onChange={e => setFilters({ ...filters, date: e.target.value })}
      />
    </div>
  );
};

export default Filters;
