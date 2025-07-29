import React from "react";
import AvrImage from "../../assets/images/howIt.png";
import "./style.css";

export default function Index() {
  return (
    <div>
      <div className="howItWorkContainer">
        <div className="howItWorkTitle">
          <span>How it works</span>
        </div>
        <div className="howItWorkContent">
          <div className="howItWorkLeft">
            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">1</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                  Get you skills According to you resume
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>
                  Upload your resume to analyze your skills and experience.
                </span>
              </div>
            </div>
            <br />
            <br />

            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">2</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                 Get what expect skills from job description
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>
                  Compare your skills with industry standards and job
                  requirements.
                </span>
              </div>
            </div>
            <br />
            <br />

            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">3</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                 Test your skills with our quiz
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>Get result.</span>
              </div>
            </div>
            <br />
            <br />

            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">4</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                Result 
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>
                    Give you full report your results and which you selected to that job 
                </span>
              </div>
            </div>
          </div>
          <div className="howItWorkRight">
            <div className="howItWorkRightImageContainer">
              <img
                src={AvrImage}
                alt="How It Works"
                className="howItWorkImage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
