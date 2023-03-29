import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./firstTimeDashboard.scss";
import { Card } from "../../shared/Card";
import CustomButton from "../../shared/CustomButton";

const FirstTimeDashboard = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);

  const [yourBirthday, setChangeYourBirthday] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const spaceName = "Weekiat & Shermaine";
  const username = "Shermaine";
  const firstPersonName = "Shermaine";
  const secondPersonName = "Wee Kiat";
  const firstPersonBirthday = "28 Jun 1995";
  const secondPersonBirthday = "16 Mar 1992";
  const anniversaryDate = "31 Dec 2023";

  const yourBirthdayHandler = (event) => {
    setChangeYourBirthday(event.target.value);
  };

  return (

    <div className={cx("space-container")}>
      <div className={cx("space-title")}>Couple Goals Dashboard</div>
      <div className={cx("space-name")}>Couple Space of {spaceName}</div>

      <div className={cx("space-welcome")}>Welcome {username}</div>

      <div className={cx("space-welcome")}>
      Enter your birthday <br/>(E.g. 10 Jan 2001)
        <input
          style={{
            borderRadius: "10px",
            padding: "10px",
            paddingRight: "100px",
            marginBottom: "20px",
            marginTop:"20px",
            marginLeft:"50px",
            display:"flex",
          }}
          type="text"
          name="name"
          placeholder="Enter Birthday"
          value={yourBirthday}
          onChange={yourBirthdayHandler}
        />
        {yourBirthday.length === 0 && formSubmitted ? (
          <div
            style={{
              marginRight:  "140px",
              marginBottom: "5px",
              marginTop: "-15px",
              color: "darkred",
            }}
          >
            *required
          </div>
        ) : null}
      </div>
      <div className={cx("space-welcome")}>
        Enter your partner's birthday (E.g. 12 Jan 1991)
      <input
          style={{
            borderRadius: "10px",
            padding: "10px",
            paddingRight: "100px",
            marginBottom: "20px",
            marginTop:"20px",
            marginLeft:"50px",
            display:"flex",
          }}
          type="text"
          name="name"
          placeholder="Enter Birthday"
          value={yourBirthday}
          onChange={yourBirthdayHandler}
        />
        {yourBirthday.length === 0 && formSubmitted ? (
          <div
            style={{
              marginRight:  "140px",
              marginBottom: "5px",
              marginTop: "-15px",
              color: "darkred",
            }}
          >
            *required
          </div>
        ) : null}
      </div>

      <div className={cx("space-welcome")}>
        When did you get together? 
        <input
          style={{
            borderRadius: "10px",
            padding: "10px",
            paddingRight: "100px",
            marginBottom: "20px",
            marginTop:"20px",
            marginLeft:"50px",
            display:"flex",
          }}
          type="text"
          name="name"
          placeholder="Enter Date"
          value={yourBirthday}
          onChange={yourBirthdayHandler}
        />
        {yourBirthday.length === 0 && formSubmitted ? (
          <div
            style={{
              marginRight: "140px",
              marginBottom: "5px",
              marginTop: "-15px",
              color: "darkred",
            }}
          >
            *required
          </div>
        ) : null}
      </div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Done"
        clicked={async () => {
          setFormSubmitted(true);

          if (
            yourBirthday.length !== 0 
          ) {
            console.log("pressed")
          }
        }}
      ></CustomButton>

    </div>
  );
};
export default FirstTimeDashboard;
