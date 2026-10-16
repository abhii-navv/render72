const BASE_URL = 'https://render72.pages.dev';

export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/api/test/events`);
  if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
  const data = await res.json();
  return data.events || [];
}

export async function fetchEventById(id) {
  const res = await fetch(`${BASE_URL}/api/test/events/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch event: ${res.status}`);
  const data = await res.json();
  return data.event || data;
}
