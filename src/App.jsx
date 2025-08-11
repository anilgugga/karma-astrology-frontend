// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MarriageAge from "./components/MarriageAge";
import Profile from "./components/Profile";
// Future components (add them when ready)
import TransitDasha from "./components/TransitDasha";
import Compatibility from "./components/Compatibility";
import BirthInputForm from "./modules/birthInputForm/BirthInputForm";
import BirthChart from "./pages/BirthChart";

export default function App() {
  return (
    <Router>
      <div className="bg-deepblue text-cosmicwhite font-cosmic min-h-screen">
        {/* Navigation */}
        <nav className="bg-cardblue px-4 py-3 shadow-md flex gap-6 justify-center text-gold font-semibold">
          <Link to="/marriage-age" className="hover:text-yellow-400">💍 Marriage Age</Link>
          <Link to="/birth-input" className="hover:text-yellow-400">🌀 Birth Chart</Link>
          <Link to="/profile" className="hover:text-yellow-400">🧾 Profile</Link>
          <Link to="/transit" className="hover:text-yellow-400">🪐 Transit</Link>
          <Link to="/compatibility" className="hover:text-yellow-400">❤️ Compatibility</Link>
        </nav>

        {/* Route Pages */}
        <Routes>
          <Route path="/" element={<MarriageAge />} />
          <Route path="/marriage-age" element={<MarriageAge />} />
          <Route path="/birth-input" element={<BirthInputForm />} />
          <Route path="/birth-chart" element={<BirthChart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transit" element={<TransitDasha />} />
          <Route path="/compatibility" element={<Compatibility />} />
        </Routes>
      </div>
    </Router>
  );
}
