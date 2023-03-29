import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Dashboard.scss";
import { Card } from "../../shared/Card";


import Couple from "../../assets/couple.png"
import CustomButton from "../../shared/CustomButton";
import { BigCard } from "../../shared/BigCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);

  const spaceName = "Weekiat & Shermaine";
  const username ="Shermaine"
  const firstPersonName = "Shermaine";
  const secondPersonName = "Wee Kiat";
  const firstPersonBirthday = "28 Jun 1995";
  const secondPersonBirthday = "16 Mar 1992";
  const anniversaryDate = "31 Dec 2023";

  function getNumberOfDays(start) {
    const date1 = new Date(start);
    const date2 = new Date();

    console.log("Date1", date1);
    console.log("date2", date2)

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);


    console.log("diff", diffInDays)

    return diffInDays;
}

// mm.dd.yyyy
let daysTgt = getNumberOfDays("12/31/2021");


function getFormatedStringFromDays(numberOfDays) {
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor(numberOfDays % 365 / 30);
    var days = Math.floor(numberOfDays % 365 % 30);

    var yearsDisplay = years > 0 ? years + (years == 1 ? " Year, " : " Years, ") : "";
    var monthsDisplay = months > 0 ? months + (months == 1 ? " Month, " : " Months, ") : "";
    var daysDisplay = days > 0 ? days + (days == 1 ? " Day" : " Days") : "";
    return yearsDisplay + monthsDisplay + daysDisplay; 
}

const yearsTgt = getFormatedStringFromDays(daysTgt);

  return (
    <div className={cx("space-container")}>
        <div className={cx("space-title")}>Couple Goals Dashboard</div>
      <div className={cx("space-name")}>Couple Space of {spaceName}</div>

      <div className={cx("space-welcome")}>Welcome {username}</div>


      <div className={cx("space-welcome")}>Your Birthday: {firstPersonBirthday}</div>
      <div className={cx("space-welcome")}>Your Partner's Birthday: {secondPersonBirthday}</div>

      <div className={cx("space-welcome")}>When did you get together? {anniversaryDate}</div>

      <div className={cx("space-welcome")}>Been together for {daysTgt} days, which is <br/>{yearsTgt} .</div>
      <div className="big-card-container">
        <div className="big-card-title">Finance Tracker</div>
      <Card
          title="Savings for BTO"
          description="To save $500 every month till 2028"
          buttonText="Learn More"
          link="card2"
        />
        <Card
          title="Savings for Vacation"
          description="To save $500 every month till 2028"
          buttonText="Learn More"
          link="card2"
        />

    </div>
    </div>
  );
};

export default Dashboard;
