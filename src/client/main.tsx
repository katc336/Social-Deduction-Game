import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage/Homepage";
import Dashboard from "./components/UserDashboard/Dashboard";
import SavedGame from "./components/SavedElements/SavedGame";
import GameSetUp from "./components/GameSetupPage/GameSetUp";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story_teller" element={<Dashboard />} />
        <Route path="/story_teller/new?:gameId" element={<GameSetUp />} />
        <Route path="/story_teller/prev?:gameId" element={<SavedGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
