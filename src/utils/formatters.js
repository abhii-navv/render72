/**
 * Format price in Indian Rupees or "Free"
 */
export function formatPrice(price) {
  if (!price || price === 0) return 'Free';
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Format a date string (YYYY-MM-DD) to human-readable
 * e.g. "Nov 13, 2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format time string "HH:MM" → "10:00 AM"
 */
export function formatTime(timeStr) {
  if (!timeStr) return '';
  const [hourStr, min] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return `${h12}:${min} ${ampm}`;
}

/**
 * Format schedule summary into a readable string
 */
export function formatSchedule(summary) {
  if (!summary) return '';
  const { start_date, start_time, end_date, end_time } = summary;
  const sDate = formatDate(start_date);
  const eDate = formatDate(end_date);
  const sTime = formatTime(start_time);
  const eTime = formatTime(end_time);

  if (start_date === end_date) {
    return `${sDate} · ${sTime} – ${eTime}`;
  }
  return `${sDate} ${sTime} – ${eDate} ${eTime}`;
}

/**
 * Format registration deadline
 */
export function formatDeadline(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get registration status display info
 */
export function getStatusInfo(status) {
  switch (status) {
    case 'OPEN':
      return { label: 'Open', className: 'badge-status-open' };
    case 'CLOSED':
      return { label: 'Closed', className: 'badge-status-closed' };
    case 'SOLD_OUT':
      return { label: 'Sold Out', className: 'badge-status-sold-out' };
    case 'COMPLETED':
      return { label: 'Completed', className: 'badge-status-completed' };
    default:
      return { label: status, className: 'badge-status-closed' };
  }
}

/**
 * Get event mode label
 */
export function getModeLabel(mode) {
  switch (mode) {
    case 'ONLINE': return 'Online';
    case 'OFFLINE': return 'Offline';
    case 'HYBRID': return 'Hybrid';
    default: return mode;
  }
}

/**
 * Calculate seats remaining percentage
 */
export function getSeatsPercent(filled, total) {
  if (!total) return 0;
  return Math.round((filled / total) * 100);
}
