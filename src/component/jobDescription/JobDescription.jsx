// src/component/jobDescription/Index.jsx

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/index";
import { Toast } from "primereact/toast";
import "./style.css";

export default function JobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading]               = useState(false);
  const toast                                = useRef(null);
  const navigate                             = useNavigate();

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleContinue = async () => {
    if (!jobDescription.trim()) {
      toast.current?.show({
        severity: "warn",
        summary:  "Description Required",
        detail:   "Please paste the job description before continuing",
        life:     5000,
      });
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.current?.show({
        severity: "error",
        summary:  "Not Logged In",
        detail:   "Please login before submitting a job description",
        life:     5000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        user_id: userId,
        text:    jobDescription,
      };

      const res = await fetch(`${config.API_URL}/analyze-jd/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to submit description");
      }

      const responseData = await res.json();
      const jdId         = responseData.id;
      const entities     = responseData.entities;

      // Navigate to Quiz step, passing along userId, jdId, and entities
      navigate("/quiz", {
        state: { userId, jdId, entities },
      });
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary:  "Submission Error",
        detail:   err.message,
        life:     5000,
      });
      console.error("Error submitting JD:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toast ref={toast} />

      <div className="uploadCVContainer">
        {/* Left side: Job Description input */}
        <div className="uploadCvLeft">
          <div className="uploadCvSestion">
            <div className="uploadCvHeader">
              <span>Paste your Job Description here</span>
            </div>
            <textarea
              rows={12}
              value={jobDescription}
              onChange={handleDescriptionChange}
              placeholder="Paste the job description…"
              style={{
                width: "100%",
                padding: 8,
                marginTop: 8,
                fontFamily: "inherit",
              }}
            />
            <div className="continueButton" style={{ marginTop: 12 }}>
              <span onClick={handleContinue}>
                {loading ? "Submitting…" : "Continue"}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Stepper */}
        <div className="uploadCvRight">
          <div className="stepper-container">
            <div className="step active">
              <div className="step-number">1</div>
              <div className="step-label">Upload CV</div>
            </div>
            <div className="step active">
              <div className="step-number">2</div>
              <div className="step-label">
                <strong>Job Description</strong>
              </div>
            </div>
            <div className="step">
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
  );
}
