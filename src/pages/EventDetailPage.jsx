import { useState } from 'react';
import { useEventDetail } from '../hooks/useEventDetail';
import { LoadingState, ErrorState } from '../components/States';
import CountUp from '../components/CountUp/CountUp';
import HoldButton from '../components/HoldButton/HoldButton';
import { CategoryIcon, IconArrowLeft, IconTicket, IconCheck } from '../components/Icons';
import {
  formatPrice, formatSchedule, formatDeadline,
  getModeLabel, getStatusInfo, getSeatsPercent,
} from '../utils/formatters';

export function EventDetailPage({ eventId, navigate }) {
  const { event, loading, error, retry } = useEventDetail(eventId);
  const [registered, setRegistered] = useState(false);

  if (loading) {
    return (
      <div style={{ padding: '4rem 0' }}>
        <LoadingState message="Loading event details…" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '4rem 2rem' }}>
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  if (!event) return null;

  const {
    name, blurb, cover_image_url, cover_image_alt, category, event_type,
    event_mode, event_status, is_featured, is_technical, price, is_per_head,
    min_teamsize, max_teamsize, total_seats, seats_filled, registration_status,
    registration_deadline, schedule_summary, tags = [],
  } = event;

  const status = getStatusInfo(registration_status);
  const effectiveSeatsFilled = registered ? seats_filled + 1 : seats_filled;
  const seatsLeft = Math.max(0, total_seats - effectiveSeatsFilled);
  const seatsPercent = getSeatsPercent(effectiveSeatsFilled, total_seats);
  const isFree = !price || price === 0;
  const isOpen = registration_status === 'OPEN';

  const statusBadgeClass = {
    OPEN: 'badge-open',
    CLOSED: 'badge-closed',
    SOLD_OUT: 'badge-sold',
    COMPLETED: 'badge-done',
  }[registration_status] ?? 'badge-closed';

  return (
    <div className="event-detail-page">
      {/* Hero image */}
      <div className="event-detail-hero">
        <img
          src={cover_image_url}
          alt={cover_image_alt || name}
          className="event-detail-hero-img"
          loading="eager"
        />
        <div className="event-detail-hero-overlay" aria-hidden="true" />
        <div className="event-detail-hero-content">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-cat">{category}</span>
            {is_featured && <span className="badge badge-feat">Featured</span>}
            {isFree && <span className="badge badge-free">Free</span>}
            <span className={`badge ${statusBadgeClass}`}>{status.label}</span>
            <span className="badge badge-mode" style={{ position: 'static' }}>{getModeLabel(event_mode)}</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--almond)',
              letterSpacing: '-0.02em',
              maxWidth: '760px',
            }}
          >
            {name}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="event-detail-layout">
        {/* Main column */}
        <main className="event-detail-main">
          <button className="back-btn" onClick={() => navigate('events')} aria-label="Back to events">
            <IconArrowLeft size={14} style={{ marginRight: '6px' }} /> All Events
          </button>

          {/* About */}
          <section className="detail-section" aria-labelledby="about-heading">
            <h2 className="detail-section-title" id="about-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CategoryIcon category={category} size={20} />
              About this Event
            </h2>
            <p className="detail-section-body">{blurb}</p>
          </section>

          {/* Tags */}
          {tags.length > 0 && (
            <section className="detail-section" aria-labelledby="tags-heading">
              <h2 className="detail-section-title" id="tags-heading">Tags</h2>
              <div className="tags-wrap" role="list">
                {tags.map(tag => (
                  <span key={tag} className="tag" role="listitem">{tag}</span>
                ))}
              </div>
            </section>
          )}

          {/* Schedule */}
          {schedule_summary && (
            <section className="detail-section" aria-labelledby="schedule-heading">
              <h2 className="detail-section-title" id="schedule-heading">Schedule</h2>
              <div className="sidebar-info-grid">
                <div className="sidebar-info-item">
                  <span className="sidebar-info-key">Date &amp; Time</span>
                  <span className="sidebar-info-val">{formatSchedule(schedule_summary)}</span>
                </div>
                {registration_deadline && (
                  <div className="sidebar-info-item">
                    <span className="sidebar-info-key">Registration Closes</span>
                    <span className="sidebar-info-val" style={{ color: 'var(--khaki)' }}>
                      {formatDeadline(registration_deadline)}
                    </span>
                  </div>
                )}
                <div className="sidebar-info-item">
                  <span className="sidebar-info-key">Event Status</span>
                  <span className="sidebar-info-val">
                    {event_status.charAt(0) + event_status.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="event-sidebar" aria-label="Registration and event info">
          {/* Registration card */}
          <div
            className="sidebar-card"
            style={{ borderTop: `2px solid var(--walnut)` }}
          >
            <div className="sidebar-card-label">Registration</div>

            <div className={`reg-price-display${isFree ? ' free' : ''}`}>
              {isFree ? 'Free' : (
                <>₹<CountUp to={price} separator="," duration={1.5} /></>
              )}
            </div>
            {!isFree && (
              <div className="reg-price-sub">
                {is_per_head ? 'PER PERSON' : 'PER TEAM'}
              </div>
            )}

            {/* Seat progress */}
            <div className="seat-progress-wrap">
              <div className="seat-progress-label">
                <span>
                  {seatsLeft > 0 ? (
                    <><CountUp to={seatsLeft} duration={1.5} /> seats left</>
                  ) : (
                    'No seats left'
                  )}
                </span>
                <span>
                  <CountUp to={effectiveSeatsFilled} duration={1.5} /> / <CountUp to={total_seats} duration={1.5} />
                </span>
              </div>
              <div className="seat-bar" aria-label={`${seatsPercent}% filled`}>
                <div
                  className={`seat-bar-fill${seatsPercent >= 80 ? ' warn' : ''}`}
                  style={{ width: `${seatsPercent}%` }}
                />
              </div>
            </div>

            {/* Hold to Register Button */}
            {isOpen ? (
              <div style={{ marginTop: '1rem', width: '100%' }}>
                <HoldButton
                  className="w-full"
                  children="Hold to Register"
                  doneLabel="Spot Reserved!"
                  icon={<IconTicket size={16} />}
                  doneIcon={<IconCheck size={16} />}
                  backgroundColor="#22333B"
                  fillColor="#C6AC8F"
                  textColor="#EAE0D5"
                  fillTextColor="#22333B"
                  size="md"
                  radius={6}
                  holdTime={1400}
                  onHold={() => setRegistered(true)}
                />
                {registered && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--khaki)', textAlign: 'center', marginTop: '8px' }}>
                    Registration pass secured! Check your email for event check-in details.
                  </p>
                )}
              </div>
            ) : (
              <button
                id="register-btn"
                className="reg-btn closed"
                disabled
                aria-label={`Registration closed for ${name}`}
              >
                {status.label}
              </button>
            )}
          </div>

          {/* Event details card */}
          <div className="sidebar-card">
            <div className="sidebar-card-label">Details</div>
            <div className="sidebar-info-grid">
              {[
                ['Type', event_type],
                ['Mode', getModeLabel(event_mode)],
                ['Category', category],
                ['Technical', is_technical ? 'Yes' : 'No'],
                ['Team Size', min_teamsize === max_teamsize
                  ? `${min_teamsize} member${min_teamsize !== 1 ? 's' : ''}`
                  : `${min_teamsize}–${max_teamsize} members`],
              ].map(([key, val]) => (
                <div key={key} className="sidebar-info-item">
                  <span className="sidebar-info-key">{key}</span>
                  <span className="sidebar-info-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
