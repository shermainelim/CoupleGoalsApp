import React, { useState, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./FinanceForm.scss";
import { Card } from "../../shared/Card";
import CustomButton from "../../shared/CustomButton";
import {
  goalPost,
  fetchGoal,
  logOutFirstPerson,
  logOutSecondPerson,
  useFirstPerson,
  useGoalFetch,
  goalDelete,
  goalDone,
} from "../../redux/appSlice";
import { Navigate } from "react-router-dom";
import moment from "moment";

const FinanceForm = () => {
  const cx = classNames.bind(styles);

  return (
    <div className={cx("space-container")}>
      <div className="big-card-container">
        <div className="big-card-title">Finance Tracker Form</div>
        <div className="small-card-container-goals">
          <div className="small-card-title">Title of Tracker</div>
          <div>
            <input
              style={{marginTop:"5px", marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              placeholder=""
            />
          </div>

          <div className="small-card-title">Description</div>
          <div>
            <textarea
              style={{marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              placeholder=""
              multiline={true}
            />
          </div>

          <div className="small-card-title">Start Goal Amount</div>
          <div>
            <input
              style={{marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              placeholder=""
            />
          </div>

          <div className="small-card-title">Current Saved Amount</div>
          <div>
            <input
              style={{marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              placeholder=""
            />
          </div>

          <div className="small-card-title">End Goal Amount</div>
          <div>
            <input
              style={{marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              placeholder=""
            />
          </div>
          <CustomButton
            className="resident-btn"
            testId="resident"
            content="Submit"

            // resident={true}
          ></CustomButton>

          <CustomButton
            className="resident-btn"
            testId="resident"
            content="Back"

            // resident={true}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FinanceForm;
