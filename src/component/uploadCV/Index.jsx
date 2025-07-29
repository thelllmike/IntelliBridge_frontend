// src/component/uploadCV/Index.jsx

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/index";
import { Toast } from "primereact/toast";
import "./style.css";

export default function UploadCV() {
  const fileInputRef = useRef(null);
  const toast        = useRef(null);
  const navigate     = useNavigate();

  const [fileName, setFileName] = useState("");
  const [cvFile, setCvFile]     = useState(null);
  const [loading, setLoading]   = useState(false);

  // 1) Trigger file picker
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // 2) Store selected file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setCvFile(file);
    }
  };

  // 3) Upload + include user_id
  const handleContinue = async () => {
    if (!cvFile) {
      toast.current?.show({
        severity: "warn",
        summary:  "File Required",
        detail:   "Please select a CV file before continuing",
        life:     5000,
      });
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.current?.show({
        severity: "error",
        summary:  "Not Logged In",
        detail:   "Please login before uploading your CV",
        life:     5000,
      });
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file",    cvFile);
      formDataToSend.append("user_id", userId);

      const response = await fetch(`${config.API_URL}/upload-pdf/`, {
        method: "POST",
        body:   formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload CV");
      }

      const responseData = await response.json();
      // responseData.id is the MongoDB record ID for this CV
      const cvRecordId   = responseData.id;

      // Navigate to Job Description step, passing along what you need
      navigate("/job-description", {
        state: { 
          userId, 
          cvRecordId, 
          txtFile: responseData.txt_file, 
          skillData: responseData.skill_extraction 
        },
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary:  "Upload Error",
        detail:   error.message,
        life:     5000,
      });
      console.error("Error uploading CV:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="uploadCVContainer">
        <div className="uploadCvLeft">
          <div className="uploadCvSestion">
            <div className="uploadCvHeader">
              <span>
                Upload your resume here and find which one is the right fit for
                you
              </span>
            </div>
            <div className="uploadInput" onClick={triggerFileInput}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="uploadInputText">
                <span>
                  <span className="uploadText">Upload</span> or Drop your CV here
                </span>
              </div>
              <div className="formatType">
                <span>PDF/Docx only</span>
              </div>
            </div>
            <div className="fileName">
              <span>{fileName || "File name appear here"}</span>
            </div>
            <div className="continueButton">
              <span onClick={handleContinue}>
                {loading ? "Uploading..." : "Continue"}
              </span>
            </div>
          </div>
        </div>
        <div className="uploadCvRight">
          <div className="stepper-container">
            <div className="step active">
              <div className="step-number">1</div>
              <div className="step-label">
                <strong>Upload CV</strong>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-label">Job Description</div>
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
