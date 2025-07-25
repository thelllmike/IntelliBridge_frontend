import React from "react";
import NavBar from "../component/navBar/NavBar";
import Quiz from "../component/quiz/Index";
import Footer from "../component/footer/Footer";
import "./DataExtractionPage.css";  // reuse the flex layout CSS

export default function PersonalityTraitsQuestionPage() {
  return (
    <div className="pageContainer">
      <header className="pageHeader">
        <NavBar />
      </header>

      <main className="pageContent">
        <Quiz />
      </main>

      <footer className="pageFooter">
        <Footer />
      </footer>
    </div>
  );
}
