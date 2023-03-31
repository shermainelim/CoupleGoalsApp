import React, { useState, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./Dashboard.scss";
import { Card } from "../../shared/Card";
import CustomButton from "../../shared/CustomButton";
import UpdateForm from "../todo/UpdateForm";
import AddTaskForm from "../todo/AddTaskForm";
import ToDo from "../todo/ToDo";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import {
  goalPost,
  fetchGoal,
  logOutFirstPerson,
  logOutSecondPerson,
  useSecondPerson,
  useGoalFetch,goalDelete, goalDone
} from "../../redux/appSlice";
import { Navigate } from "react-router-dom";
import moment from "moment";

const DashboardSecond = () => {
  const cx = classNames.bind(styles);

  const [logout, setLogout] = useState(false);

  const [toDo, setToDo] = useState([]);



  useEffect(() => {
 
  
    dispatch(fetchGoal({ spaceName }));
    processNow();
    sortedArr();
    
    setToDo(finalArr);
    newArr=[];
    finalArr=[];
   
  }, []);

  function refresh() {
  
    dispatch(fetchGoal({ spaceName }));
    processNow();
    sortedArr();
    setToDo(finalArr);

    newArr=[];
    finalArr=[];
    
   
  }



  let newArr = [];

  //const fetchGoalData = useSelector(state => state.goalFetchData);

  
 let fetchGoalData = useGoalFetch();

//  useEffect(()=>{
//   refresh();
//  },[toDo])

  function processNow() {

    if (fetchGoalData === undefined) {
      return;
    } else {
      
      let onlyGoalsTable = fetchGoalData[1];

      const objCopy = [onlyGoalsTable];
      objCopy[0]?.map(function (element) {
        let newData = { ...element };
  
        if (element?.status === 0) {
          newData.status = false;
          newArr.push({ newData });
        
        } else if (element?.status === 1) {
          newData.status = true;
          newArr.push({ newData });
        }
        return newData;
      });
    }
  }

  let finalArr = [];

  function sortedArr() {
    if (newArr.length === 0) {
      return;
    }
    newArr.map(function (element) {
      finalArr.push({
        spaceName: element.newData.spaceName,
        id: element.newData.id,
        title: element.newData.title,
        status: element.newData.status,
      });
    });
  }

  // Temp State
  /////////////
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const dispatch = useDispatch();

  const secondPersonData = useSecondPerson();
 
console.log("second person data", secondPersonData)
  //first person login
  const spaceName = secondPersonData[0];
  const secondPersonNameUser = secondPersonData[1];
  const secondPersonBirthdayUser = secondPersonData[2];
  const secondPersonName = secondPersonData[3];
  const secondPersonBirthday = secondPersonData[4];
  const anniversaryDateFirstPersonUser = secondPersonData[5];

  var shortMonthNameFirstPersonUserBday = moment(
    secondPersonBirthdayUser
  ).format("DD MMM YYYY");
  var shortMonthNameSecondPersonBday =
    moment(secondPersonBirthday).format("DD MMM YYYY");
  var shortMonthAnniversaryFirstPersonUser = moment(
    anniversaryDateFirstPersonUser
  ).format("DD MMM YYYY");

  const logoutHandler = async () => {
    dispatch(logOutSecondPerson());
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

    return diffInDays;
  }

  // mm.dd.yyyy
  let daysTgt = getNumberOfDays(anniversaryDateFirstPersonUser);

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

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  // Add task
  ///////////
  const addTask = () => {
    if (newTask) {
      let num = randomIntFromInterval(1, 10000000);
      setToDo([...toDo, { id: num, title: newTask, status: false }]);

      setNewTask("");

      let id = num;
      let title = newTask;
      let status = false;

      dispatch(goalPost({ spaceName, id, title, status }));
  
    }
  };

  // Delete task
  //////////////
  const deleteTask = (tid) => {
    // refactored
    setToDo(toDo.filter((task) => task.id !== tid));

    let id = tid;



      dispatch(goalDelete({ spaceName, id }));
 
  };

  // Mark task as done or completed
  const markDone = (idt) => {
    let id = idt;
    let status = true;
   
    setToDo(
      toDo.map((task) =>
        task.id === idt ? { ...task, status: !task.status } : task
        )
    );

    dispatch(goalDone({ status , spaceName, id,}));
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
      <div className={cx("space-refresh")}>
        <div className={cx("space-title")}>Couple Goals Dashboard</div>
        <span title="refresh" onClick={refresh}>
          <FontAwesomeIcon size={"3x"} icon={faRefresh} />
        </span>
      </div>
      <div className="main-big-card-container">
        <div>
          <div className={cx("space-name-new")}>
            Couple Space of {spaceName}
          </div>
        </div>
        <div className="main-small-card-container-goals">
          <div className={cx("space-welcome")}>
            Welcome {secondPersonName}
          </div>

          <div className={cx("space-welcome")}>
            Your Birthday: {shortMonthNameSecondPersonBday}
          </div>

          <div className={cx("space-welcome")}>
            Your Partner's Name: {secondPersonNameUser}
          </div>
          <div className={cx("space-welcome")}>
            Your Partner's Birthday: {shortMonthNameFirstPersonUserBday}
          </div>

          <div className={cx("space-welcome")}>
            When did you get together? {shortMonthAnniversaryFirstPersonUser}
          </div>

          <div className={cx("space-welcome")}>
            Been together for {daysTgt} days, which is <br />
            {yearsTgt}
          </div>
        </div>
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
        clicked={logoutHandler}

        // resident={true}
      ></CustomButton>
    </div>
  );
};

export default DashboardSecond;
