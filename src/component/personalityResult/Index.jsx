import React from "react";
import ResultImage from "../../assets/images/traitResult.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const resultData = location.state?.results || [];
  const cvResultData = location.state?.responseData || [];

 const data = [
  {
    trait: "React",
    description:
      "Expertise building component‑based UIs with hooks, context, and state management libraries like Redux or Zustand.",
  },
  {
    trait: "Java",
    description:
      "Strong object‑oriented design skills, experience with Spring Boot, multithreading, and JVM performance tuning.",
  },
  {
    trait: "Python",
    description:
      "Proficient writing clean, idiomatic code; familiar with frameworks like Django or Flask and data‑science tooling.",
  },
  {
    trait: "C++",
    description:
      "Deep understanding of memory management, templates, and STL; experience writing high‑performance, low‑latency code.",
  },
  {
    trait: "SQL",
    description:
      "Skilled at designing normalized schemas, writing complex queries, and optimizing database performance in MySQL/PostgreSQL.",
  },
]
.map((traitItem) => {
    const match = resultData.find((res) => res.trait === traitItem.trait);
    return {
      ...traitItem,
      score: match ? match.score : 0,
    };
  });

  const clickInterest = () => {
    navigate("/result", {
      state: { personalityresults: resultData, responseData: cvResultData },
    });
  };

  const clickPrevious = () => {
    navigate(-1);
  };

  const scoreBodyTemplate = (rowData) => {
    return (
      <div className="score-container">
        <span className="score-text">{rowData.score}%</span>
      </div>
    );
  };

  const traitBodyTemplate = (rowData) => {
    return <span className="trait-name">{rowData.trait}</span>;
  };

  const descriptionBodyTemplate = (rowData) => {
    return <span className="description-text">{rowData.description}</span>;
  };

  return (
    <div>
      <div className="resultContainer">
        <div className="resultContent">
          <div className="resultContentLeft">
            <div className="leftContent">
              <div className="ResultImage">
                <img
                  src={ResultImage}
                  alt="resultImage"
                  className="resultImage"
                />
              </div>
              <div className="leftContentTitle">
                <span>Your Result is Ready!</span>
              </div>
              <div className="resultLeftContentSubTitle">
                <span>You completed technical Test.</span>
              </div>
              <div className="resultLeftContentDescription">
                <span>
                  Here's what your results say about you — and how they point to
                  IT careers where you'll thrive.
                </span>
              </div>
              <div className="personality-table-container">
                <DataTable
                  value={data}
                  stripedRows
                  className="personality-traits-table"
                  responsiveLayout="scroll"
                >
                  <Column
                    field="trait"
                    header="Trait"
                    body={traitBodyTemplate}
                    style={{ width: "20%" }}
                  />
                  <Column
                    field="score"
                    header="Score"
                    body={scoreBodyTemplate}
                    style={{ width: "25%" }}
                  />
                  <Column
                    field="description"
                    header="Description"
                    body={descriptionBodyTemplate}
                    style={{ width: "55%" }}
                  />
                </DataTable>
              </div>
              <hr className="hrTag" />
              <div className="resultFooter">
                <div className="footerDescription">
                  <span>
                    Let’s continue download report
                  </span>
                </div>
                <div className="footerSubDescription">
                  <span>
                    Next, we’ll explore your interests to help you find roles
                    that align with your passions.
                  </span>
                </div>
              </div>
            </div>
            <div className="resultButtonSesction">
              <div className="previewButton">
                <span onClick={clickPrevious}>&lt; Previous</span>
              </div>
              <div className="interrestButton">
                <span onClick={clickInterest}>Download Report &gt;</span>
              </div>
            </div>
          </div>
          <div className="resultContentRight">
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
              <div class="step active">
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
