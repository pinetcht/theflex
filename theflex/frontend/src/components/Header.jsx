import React from "react";

const Header = ({ filters, setFilters }) => {
  // Handle property selection
  const handlePropertyChange = (e) => {
    const selected = e.target.value;
    setFilters(filter => ({
      ...filter,
      property: selected
    }));
  };

  // Handle channel selection
  const handleChannelChange = (e) => {
    const selected = e.target.value;
    setFilters(filter => ({
      ...filter,
      channel: selected
    }));
  };


  const handleStartDateChange = (e) => {
    setFilters(prev => ({
      ...prev,
      startDate: e.target.value
    }));
  };

  const handleEndDateChange = (e) => {
    setFilters(prev => ({
      ...prev,
      endDate: e.target.value
    }));
  };

  const channels = ['Booking.com', 'Google', 'AirBnb']
  const properties = ['Downtown Apartment', 'Beach House', 'Mountain Cabin']

  console.log(channels)
  console.log(properties)

  return (
    <header
      style={{
        background: "#2c3e50",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}
    >
      <h1>Manager Dashboard</h1>

      {/* Property filter */}
      <div>
        <label htmlFor="property-select" style={{ marginRight: "0.5rem" }}>
          Property:
        </label>
        <select
          id="property-select"
          value={filters.property || "All"}
          onChange={handlePropertyChange}
          style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "none" }}
        >
          <option value="All">View All</option>
          {properties.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Channel filter */}
      <div>
        <label htmlFor="channel-select" style={{ marginRight: "0.5rem" }}>
          Channel:
        </label>
        <select
          id="channel-select"
          value={filters.channel || "All"}
          onChange={handleChannelChange}
          style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "none" }}
        >
          <option value="All">View All</option>
          {channels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Date range filter */}
      <div>
        <label style={{ marginRight: "0.5rem" }}>From:</label>
        <input
          type="date"
          value={filters.startDate || ""}
          onChange={handleStartDateChange}
          style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "none", marginRight: "0.5rem" }}
        />
        <label style={{ marginRight: "0.5rem" }}>To:</label>
        <input
          type="date"
          value={filters.endDate || ""}
          onChange={handleEndDateChange}
          style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "none" }}
        />
      </div>
    </header>
  );
};

export default Header;
