// src/pages/QuizPage.jsx
// import React from "react";
// import NavBar from "../component/navBar/NavBar";
// import Quiz from "../component/quiz/Index";
// import Footer from "../component/footer/Footer";
// import "./QuizPage.css";

// export default function QuizPage() {
//   return (
//     <div className="pageContainer">
//       <header className="pageHeader">
//         <NavBar />
//       </header>

//       <main className="pageContent">
//         <Quiz />
//       </main>

//       <footer className="pageFooter">
//         <Footer />
//       </footer>
//     </div>
//   );
// }

import React from "react";
import NavBar from "../component/navBar/NavBar";
import Quiz from "../component/quiz/Index";

export default function PersonalityTraitsQuestionPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="QuestionPageContainer">
        <Quiz />
      </div>
    </div>
  );
}

