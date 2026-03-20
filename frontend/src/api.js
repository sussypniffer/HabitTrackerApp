import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Django backend URL
});

// Get all habits
export const getHabits = () => API.get("habits/");

// Create a new habit
export const createHabit = (habit) => API.post("habits/", habit);

// Get all logs
export const getLogs = () => API.get("logs/");

// Create a new log
export const createLog = (log) => API.post("logs/", log);