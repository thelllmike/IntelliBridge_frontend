import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tips from "../../assets/images/bulbe.png";
import { ProgressBar } from "primereact/progressbar";
import { RadioButton } from "primereact/radiobutton";
import "./style.css";

export default function Index() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const cvResultData = location.state?.responseData || [];

  // in your Quiz component file (e.g. src/pages/Quiz.jsx)

const questions = [
  {
    id: 1,
    text: "I feel confident using React hooks (useState, useEffect) to manage component state and side‑effects.",
    trait: "React Hooks",
    description:
      "Measures your comfort level with React’s built‑in hooks for state and lifecycle management.",
  },
  {
    id: 2,
    text: "I understand how to optimize React component performance using techniques like React.memo, useCallback, and code‑splitting.",
    trait: "Performance Optimization",
    description:
      "Assesses your knowledge of performance tuning in React apps.",
  },
  {
    id: 3,
    text: "I can manage global state effectively using Context API or libraries like Redux or Zustand.",
    trait: "State Management",
    description:
      "Checks your familiarity with patterns for sharing state across many React components.",
  },
];


  const options = [
    { value: "01", label: "Strongly Disagree", color: "#640cb6", score: "1" },
    { value: "02", label: "Disagree", color: "#6b7280", score: "2" },
    { value: "03", label: "Neutral", color: "#6b7280", score: "3" },
    { value: "04", label: "Agree", color: "#6b7280", score: "4" },
    { value: "05", label: "Strongly agree", color: "#6b7280", score: "5" },
  ];

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      const selectedOptionObj = options.find(
        (opt) => opt.value === selectedOption
      );
      const updatedAnswers = {
        ...answers,
        [questions[currentQuestion].id]: {
          score: parseInt(selectedOptionObj.score),
          trait: questions[currentQuestion].trait,
        },
      };

      setAnswers(updatedAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption("");
      } else {
        const traitScores = {};
        Object.values(updatedAnswers).forEach(({ score, trait }) => {
          traitScores[trait] = (traitScores[trait] || 0) + score;
        });

        const finalResults = Object.entries(traitScores).map(
          ([trait, score]) => {
            const percentage = (score / 15) * 100;
            return {
              trait,
              score: Math.round(percentage),
            };
          }
        );
        navigate("/result", {
          state: { results: finalResults, responseData: cvResultData },
        });
      }
    }
  };

  const progressValue = ((currentQuestion + 1) / questions.length) * 100;
  const currentQuestionData = questions[currentQuestion];

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
                  &nbsp;&nbsp;Quiz  {currentQuestionData.trait}
                </span>
              </div>
              <div className="tipsDescription">
                <span>{currentQuestionData.description}</span>
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
                      {currentQuestionData.id}. {currentQuestionData.text}
                    </span>
                  </div>
                </div>

                <div className="options-container">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={`option-item ${
                        selectedOption === option.value ? "selected" : ""
                      }`}
                      onClick={() => handleOptionChange(option.value)}
                    >
                      <div className="option-number">{option.value}</div>
                      <div className="option-label">{option.label}</div>
                      <div className="radio-button-wrapper">
                        <RadioButton
                          inputId={option.value}
                          name="survey"
                          value={option.value}
                          onChange={(e) => handleOptionChange(e.value)}
                          checked={selectedOption === option.value}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="nextQuestionButton" onClick={handleNextQuestion}>
                <span>
                  {currentQuestion === questions.length - 1
                    ? "Finish Test"
                    : "Next Question"}{" "}
                  &gt;
                </span>
              </div>
            </div>
          </div>
          <div className="personalityTraitsQuestionContenetRight">
            <div class="stepper-container">
              <div class="step active">
                <div class="step-number">1</div>
                <div class="step-label">
                  <strong style={{ color: "#9B9BA0" }}>Upload CV</strong>
                </div>
              </div>
              <div class="step active">
                <div class="step-number">2</div>
                <div class="step-label">Job Description</div>
              </div>
              <div class="step active">
                <div class="step-number">3</div>
                <div class="step-label">Quiz Generation</div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-label">Skill Analyze</div>
              </div>
              <div class="step">
                <div class="step-number">5</div>
                <div class="step-label">Result</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
