// src/pages/ResultPage.jsx

import React from "react";
import ResultImage from "../../assets/images/traitResult.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1) Read API response from location.state
  const resultData = location.state?.resultData || {
    selected: false,
    overall_percent: 0,
    breakdown: {},
  };
  const cvResultData = location.state?.responseData || [];

  const { selected, overall_percent: overallPercent, breakdown } = resultData;

  // 2) Build table data: one row per technology
  const data = Object.entries(breakdown).map(([technology, score]) => ({
    technology,
    score,
  }));

  // 3) Column body renderers
  const technologyBody = (row) => (
    <span className="trait-name">{row.technology}</span>
  );
  const scoreBody = (row) => (
    <div className="score-container">
      <span className="score-text">{row.score}%</span>
    </div>
  );
  const descriptionBody = (row) => {
    const { score } = row;
    let desc = "";
    if (score < 30) {
      desc = "Needs improvement in this area.";
    } else if (score < 50) {
      desc = "Average performance—focus more here.";
    } else if (score < 70) {
      desc = "Good job—you're on the right track.";
    } else if (score < 90) {
      desc = "Great work—nearly top tier!";
    } else {
      desc = "Excellent—you're among the very best!";
    }
    return <span className="description-text">{desc}</span>;
  };

  // Navigation handlers
  const goPrevious = () => navigate(-1);
  const goDownload = () => {
    navigate("/result", {
      state: { personalityresults: data, responseData: cvResultData },
    });
  };

  return (
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
              <span>
                You{" "}
                {selected ? (
                  <strong style={{ color: "green" }}>Have Been Selected!</strong>
                ) : (
                  <strong style={{ color: "red" }}>Were Not Selected.</strong>
                )}{" "}
                (Overall Score: {overallPercent}%)
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
                  field="technology"
                  header="Technology"
                  body={technologyBody}
                  style={{ width: "20%" }}
                />
                <Column
                  field="score"
                  header="Score"
                  body={scoreBody}
                  style={{ width: "25%" }}
                />
                <Column
                  field="description"
                  header="Description"
                  body={descriptionBody}
                  style={{ width: "55%" }}
                />
              </DataTable>
            </div>
            <hr className="hrTag" />
            <div className="resultFooter">
              <div className="footerDescription">
                <span>Let’s continue to download your report</span>
              </div>
              <div className="footerSubDescription">
                <span>
                  Next, we’ll explore your interests to help you find roles that align with your passions.
                </span>
              </div>
            </div>
          </div>
          <div className="resultButtonSesction">
            <div className="previewButton">
              <span onClick={goPrevious}>&lt; Previous</span>
            </div>
            <div className="interrestButton">
              <span onClick={goDownload}>Download Report &gt;</span>
            </div>
          </div>
        </div>
        <div className="resultContentRight">
          <div className="stepper-container">
            <div className="step active">
              <div className="step-number">1</div>
              <div className="step-label">
                <strong style={{ color: "#9B9BA0" }}>Upload CV</strong>
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
            <div className="step active">
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
  );
}
