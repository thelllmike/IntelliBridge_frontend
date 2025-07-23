// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataExtractionPage from "./pages/DataExtractionPage"; // adjust path as needed

export default function App() {
  return (
    <Router>
      <Routes>
        {/* “/” is your landing page */}
        <Route path="/" element={<DataExtractionPage />} />
        {/* add more <Route> here as your app grows */}
      </Routes>
    </Router>
  );
}
