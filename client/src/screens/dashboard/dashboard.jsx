import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Dashboard.scss";
import { Card } from "../../shared/Card";
import CustomButton from "../../shared/CustomButton";
import UpdateForm from "../todo/UpdateForm";
import AddTaskForm from "../todo/AddTaskForm";
import ToDo from "../todo/ToDo";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus
  } from '@fortawesome/free-solid-svg-icons';
import { logOutFirstPerson } from "../../redux/appSlice";
import { Navigate } from "react-router-dom";
const Dashboard = () => {

  const cx = classNames.bind(styles);

  const [logout, setLogout] = useState(false);

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    { id: 1, title: "Finish Couple Goals", status: false },
    { id: 2, title: "Get Legendary Rank in ML", status: false },
  ]);

  // Temp State
  /////////////
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const dispatch = useDispatch();

  const spaceName = "Weekiat & Shermaine";
  const username = "Shermaine";
  const firstPersonName = "Shermaine";
  const secondPersonName = "Wee Kiat";
  const firstPersonBirthday = "28 Jun 1995";
  const secondPersonBirthday = "16 Mar 1992";
  const anniversaryDate = "31 Dec 2023";

  const logoutHandler = async () => {
    dispatch(logOutFirstPerson());
    setLogout(true);
  };

  if (logout) {
    return <Navigate to="/" />;
  }
  function getNumberOfDays(start) {
    const date1 = new Date(start);
    const date2 = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    console.log("diff", diffInDays);

    return diffInDays;
  }

  // mm.dd.yyyy
  let daysTgt = getNumberOfDays("12/31/2021");

  function getFormatedStringFromDays(numberOfDays) {
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor((numberOfDays % 365) / 30);
    var days = Math.floor((numberOfDays % 365) % 30);

    var yearsDisplay =
      years > 0 ? years + (years == 1 ? " Year, " : " Years, ") : "";
    var monthsDisplay =
      months > 0 ? months + (months == 1 ? " Month, " : " Months, ") : "";
    var daysDisplay = days > 0 ? days + (days == 1 ? " Day" : " Days") : "";
    return yearsDisplay + monthsDisplay + daysDisplay;
  }

  const yearsTgt = getFormatedStringFromDays(daysTgt);



  // Add task
  ///////////
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      setToDo([...toDo, { id: num, title: newTask, status: false }]);

      setNewTask("");
    }
  };

  // Delete task
  //////////////
  const deleteTask = (id) => {

    // refactored
    setToDo(toDo.filter((task) => task.id !== id));
  };

  // Mark task as done or completed
  const markDone = (id) => {
    setToDo(
      toDo.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for update
  const changeHolder = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);

    setUpdateData("");
  };

  return (
    <div className={cx("space-container")}>
      <div className={cx("space-title")}>Couple Goals Dashboard</div>
      <div className={cx("space-name")}>Couple Space of {spaceName}</div>

      <div className={cx("space-welcome")}>Welcome {username}</div>

      <div className={cx("space-welcome")}>
        Your Birthday: {firstPersonBirthday}
      </div>
      <div className={cx("space-welcome")}>
        Your Partner's Birthday: {secondPersonBirthday}
      </div>

      <div className={cx("space-welcome")}>
        When did you get together? {anniversaryDate}
      </div>

      <div className={cx("space-welcome")}>
        Been together for {daysTgt} days, which is <br />
        {yearsTgt} 
      </div>
      <div className="big-card-container">
        <div className="big-card-icon">
        <div className="big-card-title">Finance Tracker</div>
        <FontAwesomeIcon size="3x" icon={faCirclePlus} />
        </div>
        <Card
          title="Savings for BTO"
          description="To save $500 every month till 2028"
          buttonText="Contribute"
          buttonText2="Backtrack"
          startGoal="500"
          currentGoal="1000"
          endGoal="10000"
         
        />
        <Card
          title="Savings for Vacation"
          description="To save $200 every month till 2028"
          buttonText="Contribute"
          buttonText2="Backtrack"
          startGoal="200"
          currentGoal="400"
          endGoal="10000"
    
        />
      </div>

      <div className="big-card-container-goals">
        <div className="big-card-title">Goal Tracker</div>

        <div className="small-card-container-goals">
          {updateData && updateData ? (
            <UpdateForm
              updateData={updateData}
              changeHolder={changeHolder}
              updateTask={updateTask}
              cancelUpdate={cancelUpdate}
            />
          ) : (
            <AddTaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
            />
          )}

          {toDo && toDo.length ? "" : "No Tasks..."}

          <ToDo
            toDo={toDo}
            markDone={markDone}
            setUpdateData={setUpdateData}
            deleteTask={deleteTask}
          />
        </div>
        </div>
        <CustomButton
          className="resident-btn"
          testId="resident"
          content="Logout"
          clicked={
            logoutHandler
          }

          // resident={true}
        ></CustomButton>
      </div>

  );
};

export default Dashboard;
