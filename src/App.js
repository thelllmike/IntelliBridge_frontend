// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import DataExtractionPage from "./pages/DataExtractionPage";
import JobDescriptionPage  from "./pages/JobDescription"; 
import Quiz  from "./pages/Quiz"; 
import ResultPage from "./pages/ResultPage"; // adjust if filename is Index.jsx
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
        {/* “/” is your landing page with CV upload & JD stepper */}
        <Route path="/cv" element={<DataExtractionPage />} />

        {/* Direct route to the Job Description page */}
        <Route path="/job-description" element={<JobDescriptionPage />} />
        {/* Direct route to the Quiz page */}
        <Route path="/quiz" element={<Quiz />} />
         <Route
            path="/test-result"
            element={<ResultPage />}
          />

        {/* Add more <Route> entries here as your app grows */}
      </Routes>
    </Router>
  );
}
