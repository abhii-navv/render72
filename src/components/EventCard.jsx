import {
  formatPrice, formatSchedule, getModeLabel, getStatusInfo, getSeatsPercent,
} from '../utils/formatters';
import CountUp from './CountUp/CountUp';
import { IconCalendar, IconUsers, IconMonitor, IconMapPin, IconShuffle } from './Icons';

export function EventCard({ event, onClick }) {
  const {
    name, blurb, cover_image_url, cover_image_alt, category, event_type,
    event_mode, is_featured, price, total_seats, seats_filled,
    registration_status, schedule_summary, is_per_head,
  } = event;

  const status = getStatusInfo(registration_status);
  const seatsLeft = total_seats - seats_filled;
  const seatsPercent = getSeatsPercent(seats_filled, total_seats);
  const isFree = !price || price === 0;

  const statusClass = {
    OPEN: 'badge-open',
    CLOSED: 'badge-closed',
    SOLD_OUT: 'badge-sold',
    COMPLETED: 'badge-done',
  }[registration_status] ?? 'badge-closed';

  const modeIcon = {
    ONLINE: <IconMonitor size={11} style={{ marginRight: '4px' }} />,
    OFFLINE: <IconMapPin size={11} style={{ marginRight: '4px' }} />,
    HYBRID: <IconShuffle size={11} style={{ marginRight: '4px' }} />,
  }[event_mode] || null;

  return (
    <article
      className="event-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${name}`}
    >
      {/* Image */}
      <div className="event-card-img-wrap">
        <img
          src={cover_image_url}
          alt={cover_image_alt || name}
          className="event-card-img"
          loading="lazy"
          decoding="async"
        />
        <div className="event-card-overlay" aria-hidden="true" />

        <div className="event-card-badges">
          <span className="badge badge-cat">{category}</span>
          {is_featured && <span className="badge badge-feat">Featured</span>}
          {isFree && <span className="badge badge-free">Free</span>}
          <span className={`badge ${statusClass}`}>{status.label}</span>
        </div>

        <span className="badge badge-mode" style={{ display: 'inline-flex', alignItems: 'center' }}>
          {modeIcon}
          {getModeLabel(event_mode)}
        </span>
      </div>

      {/* Body */}
      <div className="event-card-body">
        <div className="event-card-meta-row">
          <span className="event-card-cat-label">{category}</span>
          <span className="event-card-type-label">{event_type}</span>
        </div>

        <h3 className="event-card-name">{name}</h3>
        <p className="event-card-blurb">{blurb}</p>

        <div className="event-card-info">
          {schedule_summary?.start_date && (
            <div className="event-card-info-row" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconCalendar size={13} style={{ color: 'var(--khaki)', flexShrink: 0 }} />
              <span>{formatSchedule(schedule_summary)}</span>
            </div>
          )}
          <div className="event-card-info-row" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IconUsers size={13} style={{ color: 'var(--khaki)', flexShrink: 0 }} />
            <span>
              {seatsLeft > 0 ? (
                <><CountUp to={seatsLeft} /> of <CountUp to={total_seats} /> seats left</>
              ) : (
                `Full — ${total_seats} seats`
              )}
            </span>
          </div>
        </div>

        {/* Seat bar */}
        <div className="seat-bar" aria-label={`${seatsPercent}% filled`}>
          <div
            className={`seat-bar-fill${seatsPercent >= 80 ? ' warn' : ''}`}
            style={{ width: `${seatsPercent}%` }}
          />
        </div>

        {/* Footer */}
        <div className="event-card-footer">
          <div>
            <div className={`event-price ${isFree ? 'free' : 'paid'}`}>
              {isFree ? 'Free' : <>₹<CountUp to={price} separator="," /></>}
            </div>
            {!isFree && (
              <div className="event-price-sub">{is_per_head ? 'per person' : 'per team'}</div>
            )}
          </div>
          <span className="event-cta-link" aria-hidden="true">
            View details →
          </span>
        </div>
      </div>
    </article>
  );
}
