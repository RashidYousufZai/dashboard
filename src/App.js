import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import GrafanaDashbaordPage from "./pages/GrafanaDashboard";
import SettingPage from "./pages/Settings";
import NewPanelPage from "./pages/NewPanel"
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/grafana-dashboard" element={<GrafanaDashbaordPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/new-panel"  element={<NewPanelPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
