// src/pages/QuizPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tips from "../../assets/images/bulbe.png";
import { ProgressBar } from "primereact/progressbar";
import { RadioButton } from "primereact/radiobutton";
import "./style.css";

// Module-level global to store the quiz result
export let quizResultGlobal = null;

export default function Index() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const cvResultData = location.state?.responseData || [];

  // 1) Fetch the quiz questions on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/quiz/6887a3efb912b91be6e1657a")
      .then((r) => r.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to load quiz:", err));
  }, []);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) return;
    const q = questions[currentQuestion];

    // record this answer
    setAnswers((a) => ({
      ...a,
      [q.id]: selectedOption
    }));

    if (currentQuestion < questions.length - 1) {
      // move forward
      const nextId = questions[currentQuestion + 1].id;
      setCurrentQuestion((i) => i + 1);
      setSelectedOption(answers[nextId] || "");
    } else {
      // last question → submit all answers
      const payload = Object.entries({
        ...answers,
        [q.id]: selectedOption
      }).map(([question_id, answer]) => ({
        question_id: Number(question_id),
        answer
      }));

      fetch("http://127.0.0.1:8000/quiz/6887a3efb912b91be6e1657a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then((resultData) => {
          // store globally
          quizResultGlobal = resultData;
          // navigate with the response if you still need it in the next page
          navigate("/test-result", {
            state: { resultData, responseData: cvResultData }
          });
        })
        .catch((err) => {
          console.error("Submission failed:", err);
          alert("Failed to submit quiz. Please try again.");
        });
    }
  };

  if (!questions.length) {
    return <div className="quiz-loading">Loading quiz…</div>;
  }

  const currentQuestionData = questions[currentQuestion];
  const progressValue =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div>
      <div className="personalityTraitsQuestionContainer">
        <div className="personalityTraitsQuestionContenet">
          <div className="personalityTraitsQuestionContenetLeft">
            <div className="personalityTraitsQuestionContenetLeftBoxOne">
              <div className="personalityTraitsQuestionContenetLeftTitle">
                <span>Discover Your Skills</span>
              </div>
              <div className="tipsText">
                <span>
                  <img src={Tips} alt="tips" className="tips" />
                  &nbsp;&nbsp;Quiz {currentQuestionData.skill}
                </span>
              </div>
              <div className="tipsDescription">
                <span>{currentQuestionData.question}</span>
              </div>
            </div>
            <div className="questionIdentify">
              <div className="questionCount">
                <span>
                  Questions {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="progressBar">
                <ProgressBar
                  value={progressValue}
                  showValue={false}
                  className="progressBarStyle"
                />
              </div>

              <div className="survey-container">
                <div className="question-header">
                  <div className="question-text">
                    <span>
                      {currentQuestionData.id}. 
                      {currentQuestionData.question}
                    </span>
                  </div>
                </div>

                <div className="options-container">
                  {currentQuestionData.options.map((option) => (
                    <div
                      key={option}
                      className={`option-item ${
                        selectedOption === option ? "selected" : ""
                      }`}
                      onClick={() => handleOptionChange(option)}
                    >
                      <div className="option-number"></div>
                      <div className="option-label">{option}</div>
                      <div className="radio-button-wrapper">
                        <RadioButton
                          inputId={option}
                          name="survey"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(e.value)
                          }
                          checked={selectedOption === option}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="nextQuestionButton"
                onClick={handleNextQuestion}
              >
                <span>
                  {currentQuestion === questions.length - 1
                    ? "Finish Test"
                    : "Next Question"} &gt;
                </span>
              </div>
            </div>
          </div>
          <div className="personalityTraitsQuestionContenetRight">
            <div className="stepper-container">
              <div className="step active">
                <div className="step-number">1</div>
                <div className="step-label">
                  <strong style={{ color: "#9B9BA0" }}>
                    Upload CV
                  </strong>
                </div>
              </div>
              <div className="step active">
                <div className="step-number">2</div>
                <div className="step-label">Job Description</div>
              </div>
              <div className="step active">
                <div className="step-number">3</div>
                <div className="step-label">Quiz Generation</div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-label">Skill Analyze</div>
              </div>
              <div className="step">
                <div className="step-number">5</div>
                <div className="step-label">Result</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
