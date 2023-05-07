import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  changePassword,
  forgetPassword,
  logOutFirstPerson,
  loginFirstPerson,
  useFirstPerson,
  useIsLoggedInFirstPerson,
} from "../../redux/appSlice";
import styles from "./ChangePassword.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import * as cgUtils from "../../utils/cgUtil";
import { Navigate } from "react-router-dom";

const ChangePassword = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let secondPersonData = useFirstPerson();
  const firstPersonEmail = secondPersonData[6];

  const [logout, setLogout] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [password, setChangePassword] = useState("");
  const [confirmPassword, setChangeConfirmPassword] = useState("");

 if (logout) {
  return <Navigate to="/" />;
}

  const passwordHandler = (event) => {
    setChangePassword(event.target.value);
  };


  const confirmPasswordHandler = (event) => {
    setChangeConfirmPassword(event.target.value);
  };


  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Change First Person Password</div>
      <input
        style={{
          borderRadius: "10px",
          padding: "10px",
          paddingRight: "100px",
          marginBottom: "20px",
        }}
        type="password"
        name="name"
        placeholder="Password"
        value={password}
        onChange={passwordHandler}
      />

      {password.length === 0 && formSubmitted ? (
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



<input
        style={{
          borderRadius: "10px",
          padding: "10px",
          paddingRight: "100px",
          marginBottom: "20px",
        }}
        type="password"
        name="name"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={confirmPasswordHandler}
      />

      {confirmPassword.length === 0 && formSubmitted ? (
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

{confirmPassword !==password && formSubmitted ? (
        <div
          style={{
            marginRight: "80px",
            marginBottom: "5px",
            marginTop: "10px",
            color: "darkred",
          }}
        >
          *Passwords don't match
        </div>
      ) : null}

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Change Password"
        clicked={async () => {
          setFormSubmitted(true);

          if ( 
            password.length !== 0 &&
            confirmPassword.length !==0 && password ===confirmPassword
          ) {
           
            dispatch(changePassword({ confirmPassword, firstPersonEmail }));
            setChangePassword("");
            setChangeConfirmPassword("");
            dispatch(logOutFirstPerson());
            setLogout(true);
            
          }
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
  );
};

export default ChangePassword;
