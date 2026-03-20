export default function WeeklySummary({ stats, badge }) {
  const { goodDone, goodTotal, badDone, badTotal } = stats;
  const goodRate = goodTotal > 0 ? Math.round((goodDone / goodTotal) * 100) : 0;
  const badRate = badTotal > 0 ? Math.round((badDone / badTotal) * 100) : 0;

  return (
    <div>
      <div className="section-title">THIS WEEK</div>
      <p className="section-sub">Your performance summary</p>

      <div className="summary-badge">
        <div className="summary-emoji">{badge.emoji}</div>
        <div className="summary-badge-label" style={{ color: badge.color }}>
          {badge.label}
        </div>
        <div className="summary-badge-desc">{badge.desc}</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--good)" }}>
            {goodDone}/{goodTotal}
          </div>
          <div className="stat-label">Good Habits Done</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${goodRate}%`, background: "var(--good)" }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: badDone > 0 ? "var(--bad)" : "var(--good)" }}>
            {badDone}/{badTotal}
          </div>
          <div className="stat-label">Bad Habits Done</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${badRate}%`, background: badDone > 0 ? "var(--bad)" : "var(--good)" }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--accent)" }}>{goodRate}%</div>
          <div className="stat-label">Good Completion</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: badDone === 0 ? "var(--good)" : "var(--bad)" }}>
            {badTotal > 0 ? 100 - badRate : 100}%
          </div>
          <div className="stat-label">Bad Avoided</div>
        </div>
      </div>
    </div>
  );
}