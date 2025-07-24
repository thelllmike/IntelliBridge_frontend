// src/pages/JobDescription.jsx
import React from "react";
import NavBar from "../component/navBar/NavBar";
import JobDescriptionForm from "../component/jobDescription/JobDescription"; 
import Footer from "../component/footer/Footer";
import "./JobDescription.css";

export default function JobDescriptionPage() {
  return (
    <div className="pageContainer">
      <header className="pageHeader">
        <NavBar />
      </header>

      <main className="pageContent">
        <JobDescriptionForm />
      </main>

      <footer className="pageFooter">
        <Footer />
      </footer>
    </div>
  );
}
