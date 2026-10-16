export function LoadingState({ message = 'Loading…' }) {
  return (
    <div className="state-wrap" role="status" aria-live="polite">
      <div className="loading-ring" aria-hidden="true" />
      <p className="state-desc">{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-wrap" role="alert" aria-live="assertive">
      <div className="state-title">Failed to load</div>
      <p className="state-desc">
        {message || 'Unable to reach the server. Check your connection and try again.'}
      </p>
      {onRetry && (
        <button
          id="retry-btn"
          className="btn btn-outline"
          onClick={onRetry}
          aria-label="Retry loading"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = 'Nothing here', message }) {
  return (
    <div className="state-wrap">
      <div className="state-title">{title}</div>
      {message && <p className="state-desc">{message}</p>}
    </div>
  );
}
