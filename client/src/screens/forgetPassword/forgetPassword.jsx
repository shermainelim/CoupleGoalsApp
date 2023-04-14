import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  forgetPassword,
  loginFirstPerson,
  useIsLoggedInFirstPerson,
} from "../../redux/appSlice";
import styles from "./ForgetPassword.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import * as cgUtils from "../../utils/cgUtil";
import { Navigate } from "react-router-dom";

const ForgetPassword = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
 const randNo = cgUtils.randomIntFromInterval(1,100000);

 console.log("rand", randNo);
  const firstPersonEmailHandler = (event) => {
    setChangeFirstPersonEmail(event.target.value);
  };


  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Input First Person Email</div>
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
            dispatch(forgetPassword({ randNo, firstPersonEmail }));
            
            setChangeFirstPersonEmail("");
            
          }
        }}
      ></CustomButton>

<CustomButton
        className="resident-btn"
        testId="resident"
        content="Back"
        clicked={() => {
          navigate("/loginOptions");
        }}
      ></CustomButton>

    </div>
  );
};

export default ForgetPassword;
