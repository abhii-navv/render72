# CampusPulse ⚡

**A modern, responsive campus events discovery landing page built with React + Vite.**

![CampusPulse](https://images.pexels.com/photos/9553905/pexels-photo-9553905.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop)

---

## Features

- 🎨 **Stunning dark UI** — deep purple/violet design with glassmorphism, gradient accents and micro-animations
- 🔥 **Live API data** — all events fetched dynamically from `https://render72.pages.dev/api/test/events`
- ⭐ **Featured events** — automatically surfaced from API `is_featured` flag
- 📅 **Upcoming events** — sorted by date, filtered to open/active events
- 🏷️ **Category browser** — dynamic list built from real API data
- 📊 **Live statistics** — total events, free events, available seats, category count
- 🔍 **Events listing page** — filter by status (Open/Free/Online/Offline) AND by category
- 📄 **Event detail page** — full metadata, tags, schedule, registration status, seat progress bar
- ⚡ **Loading / Error / Empty states** — with retry button on failure
- 💰 **Indian Rupee formatting** — `₹` for paid events, "Free" for zero-price
- 📱 **Fully responsive** — mobile, tablet, desktop
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard navigation, `role` attributes

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI components & state |
| **Vite** | Dev server & bundler |
| **Vanilla CSS** | Styling & animations |
| **Native Fetch API** | HTTP requests |

---

## Getting Started

### Prerequisites

- Node.js v18+ (v20 recommended)
- npm v9+

### Installation

```bash
# Clone or download the project

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Sticky nav with glassmorphism + mobile menu
│   ├── Footer.jsx        # Responsive footer
│   ├── EventCard.jsx     # Reusable event card with image, badges, metadata
│   └── States.jsx        # Loading, Error, Empty state components
├── hooks/
│   ├── useEvents.js      # Fetch all events, with loading/error/retry
│   └── useEventDetail.js # Fetch single event by ID
├── pages/
│   ├── LandingPage.jsx   # Hero + stats + featured + categories + upcoming
│   ├── EventsListPage.jsx# Filterable events grid
│   └── EventDetailPage.jsx # Full event details with sidebar
├── utils/
│   ├── api.js            # API client (fetchEvents, fetchEventById)
│   └── formatters.js     # Price (₹), date, time, status, category icon helpers
├── App.jsx               # Root component with client-side routing
├── main.jsx              # React entry point
└── index.css             # Global design system & styles
```

---

## API

Base URL: `https://render72.pages.dev`

| Endpoint | Description |
|---------|-------------|
| `GET /api/test/events` | All events |
| `GET /api/test/events/{id}` | Single event by ID |

---

## Deployment

### Render (Static Site)

1. Push to GitHub
2. Create a new **Static Site** on [Render](https://render.com)
3. Set **Build Command**: `npm run build`
4. Set **Publish Directory**: `dist`
5. Deploy!

### Vercel

```bash
npx vercel --prod
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

---

## License

MIT — built for the Render Hackathon 2026.
