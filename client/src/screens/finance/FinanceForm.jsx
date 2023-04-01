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
import { useNavigate } from "react-router-dom";


const FinanceForm = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startGoal, setStartGoal] = useState("");
  const [currentGoal, setCurrentGoal] = useState("");
  const [endGoal, setEndGoal] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const descHandler = (event) => {
    setDesc(event.target.value);
  };

  const startGoalHandler = (event) => {
   setStartGoal(event.target.value);
  };

  const currentGoalHandler = (event) => {
    setCurrentGoal(event.target.value);
   };

   const endGoalHandler = (event) => {
    setEndGoal(event.target.value);
   };

  return (
    <div className={cx("finance-space-container")}>
      <div className="big-card-container">
        <div className="big-card-title">Finance Tracker Form</div>
        <div className="small-card-container-goals">
          <div className="small-card-title">Title of Tracker</div>
          <div>
            <input
              style={{fontSize:"18px",width: "300px", marginTop:"5px", marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              value={title}
              onChange={titleHandler}
            />
                 {title.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
          </div>

          <div className="small-card-title">Description</div>
          <div>
            <textarea
              style={{fontSize:"18px",width: "300px",marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              multiline={true}
              value={desc}
              onChange={descHandler}
            />
             {desc.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
          </div>

          <div className="small-card-title">Start Goal Amount</div>
          <div>
            <input
              style={{fontSize:"18px",width: "300px",marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              value={startGoal}
              onChange={startGoalHandler}
            />
                 {startGoal.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
          </div>

          <div className="small-card-title">Current Saved Amount</div>
          <div>
            <input
              style={{fontSize:"18px",width: "300px",marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              value={currentGoal}
              onChange={currentGoalHandler}
            />
            {currentGoal.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
          </div>

          <div className="small-card-title">End Goal Amount</div>
          <div>
            <input
              style={{fontSize:"18px",width: "300px",marginTop:"5px",marginBottom:"10px", padding:"10px"}}
              type="text"
              name="name"
              value={endGoal}
              onChange={endGoalHandler}
            />
            {endGoal.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
          </div>
          <CustomButton
            className="resident-btn"
            testId="resident"
            content="Submit"
            clicked={async () => {
              setFormSubmitted(true);

          if (
            title.length !== 0 &&
            desc.length !== 0 &&
            startGoal.length !== 0 &&
            currentGoal.length !== 0 &&
            endGoal.length !==0
          ) 
            console.log("done")
          
            setTitle("");
            setDesc("");
            setStartGoal("");
            setCurrentGoal("");
            setEndGoal("");
        }}
          ></CustomButton>

          <CustomButton
            className="resident-btn"
            testId="resident"
            content="Back"

            clicked={() => {
              navigate("/dashboard");
            }}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FinanceForm;
