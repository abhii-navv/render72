import { useState, useMemo } from 'react';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/EventCard';
import { LoadingState, ErrorState, EmptyState } from '../components/States';
import CountUp from '../components/CountUp/CountUp';
import { IconArrowLeft } from '../components/Icons';

const ALL = 'All';
const STATUS_OPTS = ['All', 'Open', 'Free', 'Online', 'Offline'];

export function EventsListPage({ navigate }) {
  const { events, loading, error, retry } = useEvents();
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [activeStatus, setActiveStatus] = useState(ALL);

  const categories = useMemo(() => {
    const cats = [...new Set(events.map(e => e.category))].sort();
    return [ALL, ...cats];
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter(e => {
      const catOk = activeCategory === ALL || e.category === activeCategory;
      let statusOk = true;
      if (activeStatus === 'Open') statusOk = e.registration_status === 'OPEN';
      else if (activeStatus === 'Free') statusOk = !e.price || e.price === 0;
      else if (activeStatus === 'Online') statusOk = e.event_mode === 'ONLINE';
      else if (activeStatus === 'Offline') statusOk = e.event_mode === 'OFFLINE';
      return catOk && statusOk;
    });
  }, [events, activeCategory, activeStatus]);

  return (
    <div className="events-list-page">
      {/* Header */}
      <div className="events-list-header">
        <button className="back-btn" onClick={() => navigate('home')} aria-label="Back to home">
          <IconArrowLeft size={14} style={{ marginRight: '6px' }} /> Home
        </button>

        <h1 className="section-title">
          Campus <em>Events</em>
        </h1>

        {!loading && !error && (
          <div className="events-list-count">
            <CountUp to={filtered.length} /> event{filtered.length !== 1 ? 's' : ''} found
          </div>
        )}

        {/* Filters */}
        {!loading && !error && (
          <>
            <div
              className="filter-strip"
              role="group"
              aria-label="Filter by status"
              style={{ marginTop: '1.25rem' }}
            >
              {STATUS_OPTS.map(f => (
                <button
                  key={f}
                  className={`filter-chip${activeStatus === f ? ' active' : ''}`}
                  onClick={() => setActiveStatus(f)}
                  aria-pressed={activeStatus === f}
                >
                  {f}
                </button>
              ))}
            </div>

            {categories.length > 1 && (
              <div
                className="filter-strip"
                role="group"
                aria-label="Filter by category"
                style={{ marginTop: '0.625rem' }}
              >
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-chip${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div
        className="container"
        style={{ paddingBottom: '5rem' }}
      >
        {loading && <LoadingState message="Fetching all events…" />}
        {error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            title="No events match"
            message="Try a different category or status filter."
          />
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="events-grid" role="list" aria-label="Events">
            {filtered.map(event => (
              <div key={event.id} role="listitem">
                <EventCard
                  event={event}
                  onClick={() => navigate('event-detail', event.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
