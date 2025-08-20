# The Flex Property Reviews Dashboard

## 📌 Overview

This project is a simple review management dashboard built with **React, Express, and HTML/CSS**. It allows property managers to monitor guest reviews across different listings, filter by property, channel, or date, and track performance trends over time.

The app currently integrates with the **Hostaway API**, but also falls back to **mock data** when needed for testing or demo purposes.

Created with help of ChatGPT.

---

## 🛠 Tech Stack

* **Frontend:** React (with Recharts for visualization, Axios for API requests)
* **Backend:** Express.js (API proxy + mock data support)
* **Styling:** Plain CSS with responsive layout
* **APIs:** Hostaway API, Google Places API (for Google Reviews)

---

## 🎨 Key Design & Logic Decisions

* **Dashboard-first approach**:

  * A single dashboard view consolidates all reviews and KPIs.
  * If a filter is applied (property, channel, or date), the data dynamically updates.
  * If no filter is applied, all reviews are displayed.
  * Each element in dashboard leads to property detail page.

* **Trends & Performance**:

  * Reviews are aggregated per property.
  * Managers can see average rating, total reviews, and distribution by channel or time.
  * Line and bar charts are used to highlight trends and recurring issues.

* **Review Management**:

  * Reviews can be marked for **public display**.
  * Filtering and sorting by rating, channel, or category helps managers decide what to highlight.

---

## 🌐 API Behavior

* **Hostaway API**:

  * Backend uses an API key + accountId to fetch live reviews from Hostaway.
  * Data is normalized into a consistent format for the dashboard.

* **Mock API (fallback)**:

  * If Hostaway API is unavailable, Express serves mock JSON data formatted like Hostaway’s response.
  * This ensures the dashboard is always functional for demo/testing.

---

## ⭐ Google Reviews Integration

* A **Google Places API integration** was added for testing.
* Currently hard-coded with `placeId = ChIJ9T_5iuF544kRzwWvny2pwTk` (Faneuil Hall Marketplace, Boston, MA).
* Google reviews are displayed in a separate section from Hostaway reviews.
* **Future enhancement**: dynamically map each accommodation’s Place ID and integrate reviews into the main dashboard table.

---

## 🚀 Future Improvements

* Add **property detail pages** for in-depth per-listing analysis.
* Implement **sentiment analysis** to better detect trends and recurring issues.
* Improve **Google Reviews mapping** by linking listings to their unique Place IDs.
* Support exporting data (CSV/Excel) for offline reporting.

---

## 📂 Project Structure

```
/client        -> React frontend
/server        -> Express backend (API proxy + mock data)
/components    -> React components (Header, KPI, Trends, Charts, etc.)
/mockData      -> Sample Hostaway JSON for development
```
