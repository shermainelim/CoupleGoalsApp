import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register , checkSpaceName} from "../../redux/appSlice";
import styles from "./Register.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const cx = classNames.bind(styles);

  const [spaceName, setChangeSpaceName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [firstPersonName, setChangeFirstPersonName] = useState("");
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
  const [firstPersonPassword, setChangeFirstPersonPassword] = useState("");

  const [secondPersonName, setChangeSecondPersonName] = useState("");
  const [secondPersonEmail, setChangeSecondPersonEmail] = useState("");
  const [secondPersonPassword, setChangeSecondPersonPassword] = useState("");

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var id = randomIntFromInterval(1, 10000000);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spaceNameHandler = (event) => {
    setChangeSpaceName(event.target.value);
  };

  const firstPersonNameHandler = (event) => {
    setChangeFirstPersonName(event.target.value);
  };

  const firstPersonEmailHandler = (event) => {
    setChangeFirstPersonEmail(event.target.value);
  };

  const firstPersonPasswordHandler = (event) => {
    setChangeFirstPersonPassword(event.target.value);
  };

  const secondPersonNameHandler = (event) => {
    setChangeSecondPersonName(event.target.value);
  };

  const secondPersonEmailHandler = (event) => {
    setChangeSecondPersonEmail(event.target.value);
  };

  const secondPersonPasswordHandler = (event) => {
    setChangeSecondPersonPassword(event.target.value);
  };

  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Create a Couple Space</div>

      <div className={cx("input-container")}>
        <div className={cx("input-couple-space-name")}>
          Your Unique Couple Space's Name
        </div>
        <input
          className={cx("input-general")}
          type="text"
          name="name"
          placeholder="Couple Space Name"
          value={spaceName}
          onChange={spaceNameHandler}
        />
  {spaceName.length === 0 && formSubmitted ? (
              <div className={cx("input-general-error")}>*required</div>
            ) : null}

        <div className={cx("input-couple-space-name-person")}>1st Person</div>
       <div><input
          className={cx("input-general")}
          type="text"
          name="name"
          placeholder="1st Person's Name"
          value={firstPersonName}
          onChange={firstPersonNameHandler}
        /></div> 
  {firstPersonName.length === 0 && formSubmitted ? (
              <div className={cx("input-general-error")}>*required</div>
            ) : null}


        <div><input
          className={cx("input-general")}
          type="text"
          name="name"
          placeholder="1st Person's Email"
          value={firstPersonEmail}
          onChange={firstPersonEmailHandler}
        /></div>
  {firstPersonEmail.length === 0 && formSubmitted ? (
              <div className={cx("input-general-error")}>*required</div>
            ) : null}

        <div>
        <input
         className={cx("input-general")}
          type="password"
          name="name"
          placeholder="1st Person's Password"
          value={firstPersonPassword}
          onChange={firstPersonPasswordHandler}
        /></div>
         {firstPersonPassword.length === 0 && formSubmitted ? (
              <div className={cx("input-general-error")}>*required</div>
            ) : null}

        <div className={cx("input-couple-space-name-person")}>2nd Person</div>
        <div><input
          className={cx("input-general")}
          type="text"
          name="name"
          placeholder="2nd Person's Name"
          value={secondPersonName}
          onChange={secondPersonNameHandler}
        /></div>
         {secondPersonName.length === 0 && formSubmitted ? (
              <div className={cx("input-general-error")}>*required</div>
            ) : null}

        <div><input
          className={cx("input-general")}
          type="text"
          name="name"
          placeholder="2nd Person's Email"
          value={secondPersonEmail}
          onChange={secondPersonEmailHandler}
        /></div>

{secondPersonEmail.length === 0 && formSubmitted ? (
              <div className={cx("input-general-error")}>*required</div>
            ) : null}
        
        <div> <input
          className={cx("input-general")}
          type="password"
          name="name"
          placeholder="2nd Person's Password"
          value={secondPersonPassword}
          onChange={secondPersonPasswordHandler}
        /></div>
        {secondPersonPassword.length === 0 && formSubmitted ? (
              <div className={cx("input-general-error")}>*required</div>
            ) : null}

       
      </div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Check Unique Space Name"
        clicked={async () => {
          setFormSubmitted(true);

          if (spaceName.length !== 0
            ) {
                dispatch(checkSpaceName({id,spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, secondPersonName, secondPersonEmail, secondPersonPassword }));

              
          }
        }}
      ></CustomButton>


      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Register"
        clicked={async () => {
          setFormSubmitted(true);

          if (spaceName.length !== 0 && firstPersonName.length !== 0 && firstPersonEmail.length !==0 &&
            firstPersonPassword.length !==0 && secondPersonName.length !==0 && secondPersonEmail.length !==0 &&
            secondPersonPassword.length !==0
            ) {
                dispatch(register({id,spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, secondPersonName, secondPersonEmail, secondPersonPassword }));

                setChangeSpaceName("");
                setChangeFirstPersonName("");
                setChangeFirstPersonEmail("");
                setChangeFirstPersonPassword("");
                setChangeSecondPersonName("");
                setChangeSecondPersonEmail("");
                setChangeSecondPersonPassword("");
                navigate("/");
          }
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Back"

        clicked={() => {
          navigate("/");
        }}
      ></CustomButton>
    </div>
  );
};

export default Register;
