import React from "react";
import NavBar from "../component/navBar/NavBar";
import UploadCV from "../component/uploadCV/Index";
import Footer from "../component/footer/Footer";
import "./DataExtractionPage.css";    // import the new styles

export default function DataExtractionPage() {
  return (
    <div className="pageContainer">
      <header className="pageHeader">
        <NavBar />
      </header>

      <main className="pageContent">
        <UploadCV />
      </main>

      <footer className="pageFooter">
        <Footer />
      </footer>
    </div>
  );
}
