import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "./App";
import HomePage from "./components/HomePage/Homepage";
import Dashboard from "./components/UserDashboard/Dashboard";
import SavedGame from "./components/SavedGames/SavedGame";
import NewGameName from "./components/GamePlay/GameSetup/NewGameName";
import CharacterSetUp from "./components/GamePlay/GameSetup/CharacterSetUp";
import SavedRoles from "./components/SavedGames/SavedRoles";
import RolePicker from "./components/GamePlay/PickRoles/RolePicker";
import PlayGame from "./components/GamePlay/PlayGame/PlayGame";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story_teller" element={<Dashboard />} />
          <Route path="/story_teller/old_games" element={<SavedGame />} />
          <Route path="/story_teller/roles" element={<SavedRoles />} />
          <Route path="/story_teller/new_game" element={<NewGameName />} />
          <Route path="/story_teller/my_game/:gameId" element={<CharacterSetUp />} />
          <Route path="/story_teller/char-select/:gameId" element={<RolePicker />} />
          <Route path="/story_teller/:gameId" element={<PlayGame />} />
          <Route path="/story_teller/prev/:gameId" element={""} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
