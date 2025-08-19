import React from "react";

const Header = ({ propertiesData, reviews, filters, setFilters }) => {
  console.log(reviews)
  // Handle property selection
  const handlePropertyChange = (e) => {
    const selected = e.target.value;
    setFilters({
      ...filters,
      property: selected === "all" ? null : selected
    });
  };

  // Handle channel selection
  const handleChannelChange = (e) => {
    const selected = e.target.value;
    setFilters({
      ...filters,
      channel: selected === "all" ? null : selected
    });
  };

  // Handle date range
  const handleStartDateChange = (e) => {
    setFilters({ ...filters, startDate: e.target.value });
  };
  const handleEndDateChange = (e) => {
    setFilters({ ...filters, endDate: e.target.value });
  };

  // Extract unique channels from reviews
  const channels = Array.from(new Set(reviews.map((r) => r.channel)));

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
          value={filters.property || "all"}
          onChange={handlePropertyChange}
          style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "none" }}
        >
          <option value="all">View All</option>
          {propertiesData.map((p) => (
            <option key={p.listingMapId} value={p.listingMapId}>
              {p.listingName}
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
          value={filters.channel || "all"}
          onChange={handleChannelChange}
          style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "none" }}
        >
          <option value="all">View All</option>
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
