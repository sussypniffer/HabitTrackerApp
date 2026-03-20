import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import WeeklySummary from "./components/WeeklySummary";
import { getHabits, createHabit } from "./api"; // backend API service
import "./App.css";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export default function App() {
  const [view, setView] = useState("today");
  const [habits, setHabits] = useState([]);
  const [checks, setChecks] = useState({});
  const [theme, setTheme] = useState("dark");

  // Load habits from backend on mount
  useEffect(() => {
    getHabits()
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const todayKey = getTodayKey();
  const todayChecks = checks[todayKey] || {};

  const toggleCheck = (habitId) => {
    setChecks((prev) => {
      const day = prev[todayKey] || {};
      return { ...prev, [todayKey]: { ...day, [habitId]: !day[habitId] } };
    });
  };

  // Add habit via backend
  const addHabit = (habit) => {
    createHabit(habit)
      .then((res) => {
        setHabits((prev) => [...prev, res.data]);
      })
      .catch((err) => console.error("Error creating habit:", err));
  };

  // Delete habit locally (later wire to backend DELETE)
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // Weekly stats
  const getWeeklyStats = () => {
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - d.getDay() + i);
      return d.toISOString().split("T")[0];
    });

    let goodDone = 0, goodTotal = 0, badDone = 0, badTotal = 0;
    const goodHabits = habits.filter((h) => h.type === "good");
    const badHabits = habits.filter((h) => h.type === "bad");

    weekDays.forEach((day) => {
      const dayChecks = checks[day] || {};
      goodHabits.forEach((h) => { goodTotal++; if (dayChecks[h.id]) goodDone++; });
      badHabits.forEach((h)  => { badTotal++;  if (dayChecks[h.id]) badDone++;  });
    });

    return { goodDone, goodTotal, badDone, badTotal };
  };

  // Badge logic
  const getBadge = () => {
    const { goodDone, goodTotal, badDone, badTotal } = getWeeklyStats();
    const goodRate = goodTotal > 0 ? goodDone / goodTotal : 0;
    const badRate  = badTotal  > 0 ? badDone  / badTotal  : 0;

    if (goodRate >= 0.9 && badRate === 0)    return { emoji: "🏆", label: "LEGEND",       desc: "Flawless week. You're unstoppable.",     color: "#FFD700" };
    if (goodRate >= 0.75 && badRate <= 0.1)  return { emoji: "🥇", label: "GOLD",         desc: "Excellent discipline. Keep going!",      color: "#FFA500" };
    if (goodRate >= 0.5  && badRate <= 0.3)  return { emoji: "🥈", label: "SILVER",       desc: "Solid effort. Push a little harder.",    color: "#C0C0C0" };
    if (goodRate >= 0.25)                    return { emoji: "🥉", label: "BRONZE",       desc: "You showed up. That matters.",           color: "#CD7F32" };
    if (badRate > 0.5)                       return { emoji: "💀", label: "ROUGH WEEK",   desc: "Shake it off. New week starts soon.",    color: "#FF4444" };
    return                                          { emoji: "🌱", label: "JUST STARTED", desc: "Track your habits to earn a badge!",    color: "#a78bfa" };
  };

  const badge = getBadge();
  const stats = getWeeklyStats();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="app-title">
              <span className="title-accent">POTEN</span>
              <span className="title-sub">TIOMETER</span>
            </h1>
            <p className="app-subtitle">Build the life you want, one day at a time</p>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span className="theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>

        <nav className="app-nav">
          <button className={`nav-btn ${view === "today"   ? "active" : ""}`} onClick={() => setView("today")}>⚡ Today</button>
          <button className={`nav-btn ${view === "manage"  ? "active" : ""}`} onClick={() => setView("manage")}>✏️ Habits</button>
          <button className={`nav-btn ${view === "summary" ? "active" : ""}`} onClick={() => setView("summary")}>📊 Week</button>
        </nav>
      </header>

      <main className="app-main">
        {view === "today"   && <HabitList habits={habits} todayChecks={todayChecks} toggleCheck={toggleCheck} badge={badge} />}
        {view === "manage"  && <HabitForm habits={habits} addHabit={addHabit} deleteHabit={deleteHabit} />}
        {view === "summary" && <WeeklySummary stats={stats} badge={badge} />}
      </main>
    </div>
  );
}