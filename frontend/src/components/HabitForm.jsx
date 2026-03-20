import { useState } from "react";

export default function HabitForm({ habits, addHabit, deleteHabit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("good");

  const handleAdd = () => {
    if (!name.trim()) return;
    // ✅ include user so Django accepts it
    addHabit({
      name: name.trim(),
      description: description.trim(),
      type,
      user: 1
    });
    setName("");
    setDescription("");
    setType("good");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div>
      <div className="section-title">MY HABITS</div>
      <p className="section-sub">Add habits and classify them as good or bad</p>

      <div className="form-card">
        <div className="form-row">
          <input
            className="form-input"
            placeholder="Habit name e.g. Drink 2L of water..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>
        <div className="form-row">
          <input
            className="form-input"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>
        <div className="form-row">
          <div className="type-toggle">
            <button
              className={`type-btn ${type === "good" ? "active-good" : ""}`}
              onClick={() => setType("good")}
            >
              ✅ Good Habit
            </button>
            <button
              className={`type-btn ${type === "bad" ? "active-bad" : ""}`}
              onClick={() => setType("bad")}
            >
              ❌ Bad Habit
            </button>
          </div>
        </div>
        <button className="add-btn" onClick={handleAdd}>
          + ADD HABIT
        </button>
      </div>

      {habits.length > 0 && (
        <div>
          <div className="group-label" style={{ marginBottom: 14 }}>
            <span>All Habits ({habits.length})</span>
          </div>
          {habits.map((habit) => (
            <div key={habit.id} className="manage-habit-card">
              <span
                className={`habit-type-tag ${
                  habit.type === "good" ? "tag-good" : "tag-bad"
                }`}
              >
                {habit.type === "good" ? "Good" : "Bad"}
              </span>
              <div style={{ flex: 1 }}>
                <span className="habit-name">{habit.name}</span>
                {habit.description && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--muted-text)",
                      marginTop: 2,
                    }}
                  >
                    {habit.description}
                  </p>
                )}
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteHabit(habit.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {habits.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">✏️</div>
          <div className="empty-title">Add Your First Habit</div>
          <p>Type a habit name above and hit Add</p>
        </div>
      )}
    </div>
  );
}