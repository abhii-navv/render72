import { useMemo, useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { EventCard } from '../components/EventCard';
import { LoadingState, ErrorState, EmptyState } from '../components/States';
import TechText from '../components/TechText/TechText';
import AccordionGallery from '../components/AccordionGallery/AccordionGallery';
import CountUp from '../components/CountUp/CountUp';
import HoldButton from '../components/HoldButton/HoldButton';
import ScrollVelocity from '../components/ScrollVelocity/ScrollVelocity';
import {
  IconBolt,
  IconStar,
  IconCalendar,
  IconTag,
  IconTarget,
  IconLock,
  IconBuilding,
  IconCheck,
  IconTicket,
  IconUsers,
  CategoryIcon,
} from '../components/Icons';

/* ── Hero ─────────────────────────────────────────────────── */
function Hero({ navigate, stats }) {
  return (
    <section id="hero-section" className="hero" aria-label="Hero">
      <div className="hero-inner">
        <div className="hero-label">
          <span className="hero-label-dot" aria-hidden="true" />
          Campus events · Live now
        </div>

        {/* TechText interactive headline */}
        <div className="hero-techtext" aria-hidden="true">
          <TechText
            text="CampusPulse"
            fontFamily="'Outfit', sans-serif"
            fontWeight={800}
            fontSize={140}
            letterSpacing={-0.04}
            color="#EAE0D5"
            accentColor="#C6AC8F"
            reach={200}
            softness={0.65}
            dashLength={5}
            dashGap={3}
            strokeWidth={1.5}
            specks={10}
            labels={false}
            sweep
            speed={0.7}
          />
        </div>

        <div className="hero-body">
          <p className="hero-desc">
            Discover hackathons, workshops, cultural competitions and more — all
            happening on your campus. Find your event and register before spots fill up.
          </p>
          <div className="hero-actions">
            <button
              id="hero-explore-btn"
              className="btn btn-primary btn-lg"
              onClick={() => navigate('events')}
              aria-label="Browse all events"
            >
              Browse Events →
            </button>
            <button
              id="hero-featured-btn"
              className="btn btn-outline btn-lg"
              onClick={() =>
                document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' })
              }
              aria-label="See featured events"
            >
              Featured
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats (Total, Seats, Categories — no fee counter) ─────── */
function StatsRow({ events }) {
  const { total, seatsAvailable, catCount } = useMemo(() => {
    const seats = events.reduce((acc, e) => acc + Math.max(0, e.total_seats - e.seats_filled), 0);
    const cats = new Set(events.map(e => e.category)).size;
    return { total: events.length, seatsAvailable: seats, catCount: cats };
  }, [events]);

  const items = [
    { number: total, label: 'Total Events' },
    { number: seatsAvailable, label: 'Seats Open' },
    { number: catCount, label: 'Categories' },
  ];

  return (
    <div className="stats-row scroll-fade" aria-label="Event statistics">
      <dl className="stats-row-inner">
        {items.map(item => (
          <div key={item.label} className="stat-item">
            <dd className="stat-number">
              <CountUp to={item.number} separator="," duration={1.8} />
            </dd>
            <dt className="stat-label">{item.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ── Featured Events — AccordionGallery ───────────────────── */
function FeaturedSection({ events, navigate }) {
  const featured = useMemo(
    () => events.filter(e => e.is_featured).slice(0, 5),
    [events]
  );

  if (featured.length === 0) return null;

  const galleryItems = featured.map(e => ({
    image: e.cover_image_url,
    label: e.name,
    alt: e.cover_image_alt || e.name,
    link: '#',
    eventId: e.id,
  }));

  const handleGalleryClick = (index, item) => {
    if (item?.eventId) navigate('event-detail', item.eventId);
  };

  return (
    <section
      id="featured-section"
      className="events-gallery-section section-dark scroll-fade"
      aria-labelledby="featured-heading"
    >
      <div className="events-gallery-header">
        <div>
          <div className="section-eyebrow">
            <IconStar size={13} style={{ marginRight: '6px' }} />
            Handpicked
          </div>
          <h2 className="section-title" id="featured-heading">
            Featured <em>Events</em>
          </h2>
        </div>
        <button
          id="view-all-featured-btn"
          className="btn btn-outline"
          onClick={() => navigate('events')}
          aria-label="View all events"
        >
          View all →
        </button>
      </div>

      <div className="events-gallery-wrap">
        <AccordionGallery
          items={galleryItems}
          defaultIndex={Math.min(2, featured.length - 1)}
          accentColor="#C6AC8F"
          overlayColor="#22333B"
          textColor="#EAE0D5"
          height={460}
          gap={8}
          radius={8}
          expandRatio={0.52}
          duration={0.55}
          ease="power3.out"
          parallax={0.4}
          tilt={6}
          stagger={0.06}
          trigger="hover"
          showLabels
          grayscale
          onItemClick={handleGalleryClick}
        />
      </div>
    </section>
  );
}

/* ── How It Works (Interactive) ───────────────────────────── */
function HowItWorks({ navigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDemoCat, setSelectedDemoCat] = useState('Hackathons');
  const [reservedSeats, setReservedSeats] = useState(42);
  const [reservedStatus, setReservedStatus] = useState('idle');

  const steps = [
    {
      num: '01',
      title: 'Discover Events',
      desc: 'Browse verified tech hackathons, workshops, guest lectures, and cultural fests fetched live from campus.',
      badge: 'Step 1: Explore',
    },
    {
      num: '02',
      title: 'Filter & Reserve',
      desc: 'Filter by category, search by name, and check real-time seat availability and registration status.',
      badge: 'Step 2: Instant Reserve',
    },
    {
      num: '03',
      title: 'Attend & Level Up',
      desc: 'Participate, showcase your talent, collaborate with peers, and collect certificates and recognition.',
      badge: 'Step 3: Digital Pass',
    },
  ];

  const demoCategories = ['Hackathons', 'AI & ML', 'Robotics', 'Design', 'Cultural'];

  return (
    <section id="hiw-section" className="section-py section-light scroll-fade" aria-labelledby="hiw-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <IconBolt size={13} style={{ marginRight: '6px' }} />
            Interactive Workflow
          </div>
          <h2 className="section-title" id="hiw-heading">
            How CampusPulse <em>Works</em>
          </h2>
          <p className="section-desc">
            Click on each step below to test out the discovery engine, instant seat reservation, and digital pass generation.
          </p>
        </div>

        {/* Step Selector Cards */}
        <div className="hiw-grid scroll-stagger" role="tablist" aria-label="Workflow steps">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`hiw-step ${activeStep === idx ? 'hiw-step--active' : ''}`}
              role="tab"
              aria-selected={activeStep === idx}
              tabIndex={0}
              onClick={() => setActiveStep(idx)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveStep(idx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="hiw-num-row">
                <span className="hiw-num">{step.num} // STEP</span>
                <span className="hiw-step-badge">{step.badge}</span>
              </div>
              <h3 className="hiw-title">{step.title}</h3>
              <p className="hiw-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Live Playground Stage */}
        <div className="hiw-interactive-stage scroll-fade" style={{ marginTop: 'var(--sp-8)' }}>
          <div className="hiw-demo-top">
            <div className="hiw-demo-tag">
              <span className="hiw-pulse-dot" aria-hidden="true" />
              Live Interactive Simulator · {steps[activeStep].title}
            </div>
            <span className="hiw-demo-hint">
              {activeStep === 0 && 'Try clicking category filters below'}
              {activeStep === 1 && 'Try holding down the button to reserve a seat'}
              {activeStep === 2 && 'Your generated event pass is ready for check-in'}
            </span>
          </div>

          {/* STAGE 0: Category Filter Preview */}
          {activeStep === 0 && (
            <div>
              <div className="hiw-pill-row" role="group" aria-label="Demo category filters">
                {demoCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`hiw-pill-btn ${selectedDemoCat === cat ? 'active' : ''}`}
                    onClick={() => setSelectedDemoCat(cat)}
                  >
                    <IconTag size={12} />
                    {cat}
                  </button>
                ))}
              </div>

              <div className="hiw-card-preview">
                <div className="hiw-preview-badge-row">
                  <span className="badge badge-cat">{selectedDemoCat}</span>
                  <span className="badge badge-open">Registration Open</span>
                  <span className="badge badge-free">Campus Verified</span>
                </div>
                <div className="hiw-preview-title">
                  {selectedDemoCat === 'Hackathons' && 'Render Global 36hr Campus Hackathon'}
                  {selectedDemoCat === 'AI & ML' && 'Deep Dive: Neural Networks & Transformers Masterclass'}
                  {selectedDemoCat === 'Robotics' && 'Autonomous Drone Obstacle Challenge 2026'}
                  {selectedDemoCat === 'Design' && 'UI/UX Design Jam: High-Fidelity Prototyping'}
                  {selectedDemoCat === 'Cultural' && 'Inter-University Acoustic & Band Showcase'}
                </div>
                <div className="hiw-preview-sub">
                  Live verification · 128 registered students · Main Auditorium & Innovation Hub
                </div>
                <div className="hiw-preview-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveStep(1)}
                  >
                    Next: Test Reservation →
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => navigate('events')}
                  >
                    Browse Live Catalog
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 1: Seat Availability & Hold to Reserve Simulator (no fee counter) */}
          {activeStep === 1 && (
            <div className="hiw-res-card">
              <div className="hiw-res-stats">
                <div>
                  <span className="hiw-res-val">{reservedSeats}</span>
                  <span className="hiw-res-sub">Seats Remaining</span>
                </div>
                <div>
                  <span className="hiw-res-val">In-Person</span>
                  <span className="hiw-res-sub">Campus Mode</span>
                </div>
                <div>
                  <span className="hiw-res-val" style={{ color: reservedStatus === 'done' ? '#2a9d8f' : 'var(--gun)' }}>
                    {reservedStatus === 'done' ? 'Confirmed' : 'Live Sync'}
                  </span>
                  <span className="hiw-res-sub">Status</span>
                </div>
              </div>

              <div style={{ marginTop: 'var(--sp-6)', display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
                <HoldButton
                  holdTime={1400}
                  onHold={() => {
                    setReservedStatus('done');
                    setReservedSeats((prev) => Math.max(1, prev - 1));
                  }}
                  onTap={() => {
                    setReservedStatus('done');
                    setReservedSeats((prev) => Math.max(1, prev - 1));
                  }}
                  doneLabel="Spot Secured!"
                  doneIcon={<IconCheck size={16} />}
                >
                  Hold to Reserve Spot
                </HoldButton>

                {reservedStatus === 'done' && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2a9d8f', fontSize: '0.86rem', fontWeight: 600 }}>
                    <IconCheck size={16} /> Reserved! Seat locked in database.
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ marginLeft: '12px' }}
                      onClick={() => setActiveStep(2)}
                    >
                      View Digital Pass →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STAGE 2: Digital Pass Badge */}
          {activeStep === 2 && (
            <div className="hiw-pass-card">
              <div className="hiw-pass-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconTicket size={20} style={{ color: 'var(--walnut)' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--gun)', display: 'block' }}>
                      Official Campus Entry Pass
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--walnut)', fontFamily: 'var(--font-mono)' }}>
                      PASS ID: #CP-2026-89412
                    </span>
                  </div>
                </div>
                <span className="badge badge-open" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <IconCheck size={12} /> Verified Attendee
                </span>
              </div>

              <div className="hiw-pass-body">
                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--walnut)', textTransform: 'uppercase' }}>
                    Attendee
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--gun)' }}>
                    Alex Rivera · CS '26
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--walnut)', textTransform: 'uppercase' }}>
                    Event
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--gun)' }}>
                    Render Hackathon 2026
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--walnut)', textTransform: 'uppercase' }}>
                    Access Tier
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--gun)' }}>
                    Full Campus Access
                  </span>
                </div>
              </div>

              <div className="hiw-pass-footer">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate('events')}
                >
                  Find More Events →
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setActiveStep(0)}
                >
                  Restart Tour
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Categories ───────────────────────────────────────────── */
function CategoriesSection({ events, navigate }) {
  const categoryCounts = useMemo(() => {
    const map = {};
    events.forEach(e => { map[e.category] = (map[e.category] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [events]);

  return (
    <section
      id="categories-section"
      className="section-py section-dark scroll-fade"
      aria-labelledby="categories-heading"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <IconTag size={13} style={{ marginRight: '6px' }} />
            Browse
          </div>
          <h2 className="section-title" id="categories-heading">
            Explore by <em>Category</em>
          </h2>
          <p className="section-desc">
            Find events across every discipline — from coding and robotics to music, dance and arts.
          </p>
        </div>

        <ul className="categories-grid scroll-stagger" aria-label="Event categories">
          {categoryCounts.map(([cat, count]) => (
            <li key={cat}>
              <button
                className="category-btn"
                onClick={() => navigate('events')}
                aria-label={`${cat} — ${count} event${count !== 1 ? 's' : ''}`}
              >
                <span className="category-icon" aria-hidden="true">
                  <CategoryIcon category={cat} size={22} />
                </span>
                <span className="category-name">{cat}</span>
                <span className="category-count">{count} event{count !== 1 ? 's' : ''}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── About Section (Side-by-side counters, NO dark box) ───── */
function AboutSection({ events }) {
  const totalSeats = useMemo(
    () => events.reduce((acc, e) => acc + (e.total_seats || 0), 0),
    [events]
  );
  const categoriesCount = useMemo(
    () => new Set(events.map(e => e.category)).size,
    [events]
  );

  const features = [
    {
      icon: <IconBolt size={20} style={{ color: 'var(--khaki)' }} />,
      title: 'Live API Synchronized',
      desc: 'Direct integration with the Render72 campus events API ensures schedules, seats, and registration statuses are always real-time and verified.',
    },
    {
      icon: <IconTarget size={20} style={{ color: 'var(--khaki)' }} />,
      title: 'Cross-Disciplinary Focus',
      desc: 'Explore technical hackathons, AI workshops, robotics build-offs, cultural showcases, and guest lectures from one curated platform.',
    },
    {
      icon: <IconLock size={20} style={{ color: 'var(--khaki)' }} />,
      title: 'Instant Registration Info',
      desc: 'Transparent access with verified status, seat availability countdowns, and instant entry pass details before spots fill up.',
    },
  ];

  return (
    <section id="about-section" className="section-py section-light scroll-fade" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <IconBuilding size={13} style={{ marginRight: '6px' }} />
            About CampusPulse
          </div>
          <h2 className="section-title" id="about-heading">
            Connecting curious minds to <em>campus life</em>
          </h2>
          <p className="section-desc">
            CampusPulse bridges the gap between active student organizers and eager participants.
          </p>
        </div>

        {/* Editorial Quote & Architecture Info */}
        <div className="about-intro-grid scroll-fade">
          <p className="about-quote">
            "CampusPulse is built to eliminate the noise — giving every student a single, high-fidelity hub to explore every hackathon, workshop, and summit on campus."
          </p>
          <div className="about-meta">
            <div className="about-meta-item">
              <span className="about-meta-key">Platform</span>
              <span className="about-meta-val">CampusPulse Discovery Engine</span>
            </div>
            <div className="about-meta-item">
              <span className="about-meta-key">Hackathon</span>
              <span className="about-meta-val">Render Hackathon 2026 Edition</span>
            </div>
            <div className="about-meta-item">
              <span className="about-meta-key">Architecture</span>
              <span className="about-meta-val">React + Vite + GSAP Motion + RESTful API</span>
            </div>
          </div>
        </div>

        {/* Clean Side-by-Side Counters (NO dark box) */}
        <div className="about-stats-row scroll-fade" aria-label="CampusPulse statistics">
          <div className="about-stat-col">
            <span className="about-stat-num">
              <CountUp to={events.length} duration={2} />
            </span>
            <span className="about-stat-label">Curated Events Tracked</span>
          </div>
          <div className="about-stat-col">
            <span className="about-stat-num">
              <CountUp to={totalSeats} separator="," duration={2} />+
            </span>
            <span className="about-stat-label">Total Campus Seats</span>
          </div>
          <div className="about-stat-col">
            <span className="about-stat-num">
              <CountUp to={categoriesCount} duration={2} />
            </span>
            <span className="about-stat-label">Distinct Event Categories</span>
          </div>
        </div>

        {/* Three Value Pillars */}
        <div className="about-feats scroll-stagger" role="list">
          {features.map(f => (
            <div key={f.title} className="about-feat-card" role="listitem">
              <div className="about-feat-icon" aria-hidden="true">{f.icon}</div>
              <h3 className="about-feat-title">{f.title}</h3>
              <p className="about-feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Upcoming Events ──────────────────────────────────────── */
function UpcomingSection({ events, navigate }) {
  const upcoming = useMemo(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return events
      .filter(e => {
        const d = e.schedule_summary?.start_date;
        if (!d) return false;
        const [y, m, day] = d.split('-').map(Number);
        return new Date(y, m - 1, day) >= today && e.registration_status !== 'CLOSED';
      })
      .sort((a, b) => {
        const da = a.schedule_summary?.start_date || '';
        const db = b.schedule_summary?.start_date || '';
        return da.localeCompare(db);
      })
      .slice(0, 6);
  }, [events]);

  if (upcoming.length === 0) return null;

  return (
    <section
      id="upcoming-section"
      className="section-py section-dark scroll-fade"
      aria-labelledby="upcoming-heading"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-eyebrow">
              <IconCalendar size={13} style={{ marginRight: '6px' }} />
              Coming up
            </div>
            <h2 className="section-title" id="upcoming-heading">
              Upcoming <em>Events</em>
            </h2>
          </div>
          <button
            id="view-all-upcoming-btn"
            className="btn btn-outline"
            onClick={() => navigate('events')}
            aria-label="View all upcoming events"
          >
            View all →
          </button>
        </div>

        <div className="events-grid scroll-stagger" role="list" aria-label="Upcoming events">
          {upcoming.map(event => (
            <div key={event.id} role="listitem">
              <EventCard
                event={event}
                onClick={() => navigate('event-detail', event.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ───────────────────────────────────────────── */
function CTABanner({ navigate }) {
  return (
    <section className="cta-banner section-dark scroll-fade" aria-label="Call to action">
      <div className="cta-banner-inner">
        <div className="section-eyebrow">Ready?</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          Secure your <em>spot</em> today
        </h2>
        <p className="section-desc" style={{ textAlign: 'center', margin: 0 }}>
          Events fill up fast. Browse all listings and register before it's too late.
        </p>
        <button
          id="cta-browse-btn"
          className="btn btn-primary btn-lg"
          onClick={() => navigate('events')}
          aria-label="Browse all campus events"
        >
          Browse All Events →
        </button>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export function LandingPage({ navigate }) {
  const { events, loading, error, retry } = useEvents();

  // Scroll-fade observer to animate sections and cards as they enter view on scroll
  useScrollReveal(events.length);

  if (loading) {
    return (
      <>
        <Hero navigate={navigate} stats={{}} />
        <LoadingState message="Fetching events from the API…" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Hero navigate={navigate} stats={{}} />
        <div style={{ padding: '4rem 2rem' }}>
          <ErrorState message={error} onRetry={retry} />
        </div>
      </>
    );
  }

  if (events.length === 0) {
    return (
      <>
        <Hero navigate={navigate} stats={{}} />
        <EmptyState title="No events yet" message="Check back soon — events will appear here." />
      </>
    );
  }

  return (
    <>
      <Hero navigate={navigate} stats={{}} />
      <StatsRow events={events} />
      <FeaturedSection events={events} navigate={navigate} />
      <HowItWorks navigate={navigate} />
      <CategoriesSection events={events} navigate={navigate} />
      <div className="scroll-velocity-banner scroll-fade" aria-label="CampusPulse Kinetic Highlights">
        <ScrollVelocity
          texts={[
            'CampusPulse 2026 · Live Hackathons · Tech Workshops · Cultural Fests · Guest Lectures ·',
            'Discover · Connect · Build · Compete · Level Up · Real-Time Campus Sync ·'
          ]}
          velocity={45}
        />
      </div>
      <AboutSection events={events} />
      <UpcomingSection events={events} navigate={navigate} />
      <CTABanner navigate={navigate} />
    </>
  );
}
