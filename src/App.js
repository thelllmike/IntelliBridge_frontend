// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import DataExtractionPage from "./pages/DataExtractionPage";
import JobDescriptionPage  from "./pages/JobDescription";  // adjust if filename is Index.jsx

export default function App() {
  return (
    <Router>
      <Routes>
        {/* “/” is your landing page with CV upload & JD stepper */}
        <Route path="/" element={<DataExtractionPage />} />

        {/* Direct route to the Job Description page */}
        <Route path="/job-description" element={<JobDescriptionPage />} />

        {/* Add more <Route> entries here as your app grows */}
      </Routes>
    </Router>
  );
}
