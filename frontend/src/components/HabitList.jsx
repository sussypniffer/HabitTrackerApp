export default function HabitList({ habits, todayChecks, toggleCheck, badge }) {
  const goodHabits = habits.filter((h) => h.type === "good");
  const badHabits = habits.filter((h) => h.type === "bad");
  const totalDone = Object.values(todayChecks).filter(Boolean).length;

  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🌱</div>
        <div className="empty-title">No Habits Yet</div>
        <p>Go to the Habits tab to add your first habit</p>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">TODAY</div>
      <p className="section-sub">
        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        {totalDone > 0 && ` · ${totalDone} checked`}
      </p>

      <div className="badge-banner" style={{ "--badge-color": badge.color }}>
        <div className="badge-emoji">{badge.emoji}</div>
        <div>
          <div className="badge-label">{badge.label}</div>
          <div className="badge-desc">{badge.desc}</div>
        </div>
      </div>

      {goodHabits.length > 0 && (
        <div className="habit-group">
          <div className="group-label">
            <div className="group-label-dot dot-good" />
            Good Habits
          </div>
          {goodHabits.map((habit) => (
            <div
              key={habit.id}
              className={`habit-card ${todayChecks[habit.id] ? "checked" : ""}`}
              onClick={() => toggleCheck(habit.id)}
            >
              <div className="check-circle">
                {todayChecks[habit.id] && "✓"}
              </div>
              <span className="habit-name">{habit.name}</span>
              <span className="habit-type-tag tag-good">Good</span>
            </div>
          ))}
        </div>
      )}

      {badHabits.length > 0 && (
        <div className="habit-group">
          <div className="group-label">
            <div className="group-label-dot dot-bad" />
            Bad Habits — avoid these
          </div>
          {badHabits.map((habit) => (
            <div
              key={habit.id}
              className={`habit-card ${todayChecks[habit.id] ? "checked-bad" : ""}`}
              onClick={() => toggleCheck(habit.id)}
            >
              <div className="check-circle">
                {todayChecks[habit.id] && "✗"}
              </div>
              <span className="habit-name">{habit.name}</span>
              <span className="habit-type-tag tag-bad">Bad</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}