import React from "react";
import NavBar from "../component/navBar/NavBar";
import Result from "../component/personalityResult/Index";
import Footer from "../component/footer/Footer";
import "./DataExtractionPage.css";  // reuse the flex layout CSS

export default function ResultPage() {
  return (
    <div className="pageContainer">
      <header className="pageHeader">
        <NavBar />
      </header>

      <main className="pageContent">
        <Result />
      </main>

      <footer className="pageFooter">
        <Footer />
      </footer>
    </div>
  );
}
