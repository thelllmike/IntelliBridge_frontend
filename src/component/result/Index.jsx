// src/component/result/Index.jsx

import React, { useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import DownloadImage from "../../assets/images/download.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./style.css";

export default function Index() {
  // ── Ref for capturing the page ────────────────────────────────────────────
  const reportRef = useRef(null);

  // ── Dummy data ────────────────────────────────────────────────────────────
  const personalityresultData = [
    { trait: "React", score: 70 },
    { trait: "java", score: 55 },
    { trait: "Mern", score: 40 },
    { trait: "Jest", score: 65 },
    { trait: "Git", score: 30 },
  ];

  const responseData = {
    recommended_job_roles: [
      { jobTitle: "Software Engineer", score: 90 },
    
    ],
    why_this_role_is_a_great_fit:
      "Based on your skills and role is a strong match.",
    top3_skills: [
      { name: "React", score: 85 },
      { name: "Python", score: 70 },
      { name: "C", score: 65 },
    ],
    cv_refinement_tips: {
      tip1:
        "java",
      tip2: "C++",
      tip3: "c#",
      tip4:
        "Python",
    },
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const topJob = responseData.recommended_job_roles[0];
  const getCvRefinementTips = () =>
    Object.values(responseData.cv_refinement_tips);

  const getProgressColor = (score) =>
    score > 75 ? "#4caf50" : score < 50 ? "#f44336" : "#ff9800";

  // ── Assessment steps map ─────────────────────────────────────────────────
  const jobStepsMap = {
    "Software Engineer": [
      {
        number: 1,
        title: "Upload Your CV",
        description: "Upload your CV to begin the assessment process.",
      },
      {
        number: 2,
        title: "Analyze Job Description",
        description:
          "We analyze the job description against the skills on your CV.",
      },
      {
        number: 3,
        title: "Take the Quiz",
        description:
          "Answer questions generated based on your extracted resume skills.",
      },
      {
        number: 4,
        title: "View Fit Assumption",
        description:
          "Review your quiz results and see if you're a good fit for this role.",
      },
    ],
  };

  // ── Column renderers ──────────────────────────────────────────────────────
  const scoreBodyTemplate = (rowData) => (
    <div className="score-container">
      <span className="score-text">{rowData.score}%</span>
    </div>
  );
  const traitBodyTemplate = (rowData) => (
    <span className="trait-name">{rowData.trait}</span>
  );
  const descriptionBodyTemplate = (rowData) => (
    <span className="description-text">{rowData.description}</span>
  );

  // ── Prepare quiz table data ───────────────────────────────────────────────
  const dataTableOne = [
    { trait: "React", description: "" },
    { trait: "Java", description: "" },
    { trait: "React native", description: "" },
    { trait: "Git", description: "" },
    { trait: "C#", description: "" },
  ].map((t) => {
    const found = personalityresultData.find((r) => r.trait === t.trait) || {
      score: 0,
    };
    const score = found.score;
    let desc = "Top performer!";
    if (score < 30) desc = "Needs improvement";
    else if (score < 50) desc = "Below average, focus more";
    else if (score < 70) desc = "Average, keep practicing";
    else if (score < 90) desc = "Good!";
    return { ...t, score, description: desc };
  });

  // ── Download handler ──────────────────────────────────────────────────────
  const handleDownloadReport = async () => {
    const element = reportRef.current;
    if (!element) return console.error("reportRef is null");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("page-export.pdf");
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div ref={reportRef} className="mainResultContainer">
      <hr className="hrTag" />

      <div className="mainResultContent">
        {/* LEFT COLUMN */}
        <div className="mainResultContentLeft">
          {/* Why This Role */}
          <div className="firstBox">
            <div className="firstBoxTitle">
              <span>Why This Role is a Great Fit for You</span>
            </div>
            <div className="firstBoxDescription">
              <span>{responseData.why_this_role_is_a_great_fit}</span>
            </div>
          </div>

          {/* Top 3 Skills */}
          <div className="topSkill">
            <div className="topSkillTitle">
              <span>Top 3 Skills</span>
            </div>
            <div className="topSkillContent">
              {responseData.top3_skills.map((s, i) => (
                <div key={i} className="topSkillList">
                  <div className="topSkillProgressBar">
                    <CircularProgressbar
                      value={s.score}
                      text={`${s.score}%`}
                      strokeWidth={10}
                      styles={buildStyles({
                        pathColor: getProgressColor(s.score),
                        textColor: getProgressColor(s.score),
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                  <div className="topSkillDescription">
                    <span>
                      <strong>{s.name}</strong>
                      <br />
                      {i === 0
                        ? "Your highest match!"
                        : i === 1
                        ? "Strong compatibility."
                        : "Good match."}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Result Table */}
          <div className="dataTableOne">
            <div className="dataTableOneTitle">
              <span>Quiz Result</span>
            </div>
            <div className="personality-table-container">
              <DataTable
                value={dataTableOne}
                stripedRows
                responsiveLayout="scroll"
              >
                <Column
                  field="trait"
                  header="Trait"
                  body={traitBodyTemplate}
                />
                <Column
                  field="score"
                  header="Score"
                  body={scoreBodyTemplate}
                />
                <Column
                  field="description"
                  header="Description"
                  body={descriptionBodyTemplate}
                />
              </DataTable>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="mainResultContentRight">
          {/* Assessment Steps */}
          <div className="mainResultContentRightBox">
            <div className="startText">
              <span>Assessment Steps</span>
            </div>
            <div className="steps-container-start">
              {jobStepsMap[topJob.jobTitle].map((step) => (
                <div key={step.number} className="step-item-start">
                  <div className="step-number-start">{step.number}</div>
                  <div className="step-content-start">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CV Refinement Tips */}
          <div className="cvRefinementText">
            <span>Resume Skills</span>
          </div>
          <div className="mainResultContentRightBox">
            <ul>
              {getCvRefinementTips().map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Job Description Skills */}
          <div className="cvRefinementText">
            <span>Job Description Skills</span>
          </div>
          <div className="mainResultContentRightBox">
            <ul>
              {getCvRefinementTips().map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="download-button-container">
        <button className="download-button" onClick={handleDownloadReport}>
          <img
            src={DownloadImage}
            alt="Download icon"
            className="download-icon"
          />
          <span>Download Report</span>
        </button>
      </div>
    </div>
  );
}
