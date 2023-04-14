import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFirstPerson,
  useIsLoggedInFirstPerson,
} from "../../redux/appSlice";
import styles from "./ForgetPassword.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";

const ForgetPassword = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
 

 

 
 

  const firstPersonEmailHandler = (event) => {
    setChangeFirstPersonEmail(event.target.value);
  };


  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Input email to reset password</div>
      <input
        style={{
          borderRadius: "10px",
          padding: "10px",
          paddingRight: "100px",
          marginBottom: "20px",
        }}
        type="text"
        name="name"
        placeholder="Email"
        value={firstPersonEmail}
        onChange={firstPersonEmailHandler}
      />

      {firstPersonEmail.length === 0 && formSubmitted ? (
        <div
          style={{
            marginRight: "180px",
            marginBottom: "5px",
            marginTop: "-15px",
            color: "darkred",
          }}
        >
          *required
        </div>
      ) : null}

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Reset Password"
        clicked={async () => {
          setFormSubmitted(true);

          if (
            
            firstPersonEmail.length !== 0 
          ) {
            
            
            setChangeFirstPersonEmail("");
            
          }
        }}
      ></CustomButton>

    </div>
  );
};

export default ForgetPassword;
