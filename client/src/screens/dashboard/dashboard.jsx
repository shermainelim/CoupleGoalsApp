import React, { useState, useEffect } from "react";

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
import { goalPost, fetchGoal, logOutFirstPerson, logOutSecondPerson, useFirstPerson, useGoalFetch } from "../../redux/appSlice";
import { Navigate } from "react-router-dom";
import moment from 'moment'

const Dashboard = () => {

  const cx = classNames.bind(styles);

  const [logout, setLogout] = useState(false);

  // // Tasks (ToDo List) State
  // const [toDo, setToDo] = useState([
  //   { id: 1, title: "Finish Couple Goals", status: false },
  //   { id: 2, title: "Get Legendary Rank in ML", status: false },
  // ]);

    // Tasks (ToDo List) State
    const [toDo, setToDo] = useState([]);
  

  console.log("todoList", toDo);

  // useEffect(()=>{
  //   toDo.map(function(element){
  //     const id = element.id;
  //     const title = element.title;
  //     const status = element.status;
  //     console.log("new", element.id,element.title, element.status);
  //     console.log("dispatch goal post")
  //     dispatch(goalPost({spaceName, id,title, status }))
  //   });
  
  // },[toDo])

  useEffect(()=>{

    //fetch

    dispatch(fetchGoal({spaceName}));
    processNow();
  console.log("new todo",newArr);
  sortedArr();
  console.log("sortedrr here", finalArr);
  
    setToDo(finalArr);
    console.log("process new here");
  },[])

  function refresh(){
    dispatch(fetchGoal({spaceName}));
    processNow();
  console.log("new todo",newArr);
  sortedArr();
  console.log("sortedrr here", finalArr);
  
    setToDo(finalArr);
    console.log("process new here");
  }

  let newArr = [];
  
  // useEffect(()=>{

  // },[])

  let fetchGoalData = useGoalFetch();

 



  function processNow(){
    if(fetchGoalData=== undefined){
      return;
    }else{
      console.log("Fetch", fetchGoalData);
      let onlyGoalsTable = fetchGoalData[1];

    const objCopy = [onlyGoalsTable];
    objCopy[0]?.map(function(element){
      let newData = {...element}
    console.log("element", element.status)
    if(element?.status===0){
      newData.status = false;
      newArr.push({newData})
      console.log("newarr", newArr)
    }else if(element?.status ===1){
      newData.status = true;
      newArr.push({newData})
    }
   return newData;
  })
    }
    
  }

  let finalArr=[];

  function sortedArr(){
    if(newArr.length===0){
      return;
    }
   newArr.map(function(element){
    console.log("element sorted arr",element);
    finalArr.push({spaceName:element.newData.spaceName, id: element.newData.id, title:element.newData.title ,status:element.newData.status});
  })
  };

  // Temp State
  /////////////
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const dispatch = useDispatch();

  const firstPersonData = useFirstPerson();
  console.log("Dashboard first person daat", firstPersonData);

  //first person login
  const spaceName = firstPersonData[0];
  const firstPersonNameUser = firstPersonData[1];
  const firstPersonBirthdayUser = firstPersonData[2];
  const secondPersonName =firstPersonData[3];
  const secondPersonBirthday =firstPersonData[4];
  const anniversaryDateFirstPersonUser = firstPersonData[5];

  var shortMonthNameFirstPersonUserBday = moment(firstPersonBirthdayUser).format('DD MMM YYYY')
  var shortMonthNameSecondPersonBday = moment(secondPersonBirthday).format('DD MMM YYYY')
  var shortMonthAnniversaryFirstPersonUser = moment(anniversaryDateFirstPersonUser).format('DD MMM YYYY')



  const logoutHandler = async () => {
    dispatch(logOutFirstPerson());
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



  // Add task
  ///////////
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      setToDo([...toDo, { id: num, title: newTask, status: false }]);
      
      setNewTask("");

      let id = num;
      let title = newTask;
      let status = false;
      
      dispatch(goalPost({spaceName, id,title, status }))
      console.log("after add", toDo);
  
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

      <div className={cx("space-welcome")}>Welcome {firstPersonNameUser}</div>

      <div className={cx("space-welcome")}>
        Your Birthday: {shortMonthNameFirstPersonUserBday}
      </div>

      <div className={cx("space-welcome")}>
        Your Partner's Name: {secondPersonName}
      </div>
      <div className={cx("space-welcome")}>
        Your Partner's Birthday: {shortMonthNameSecondPersonBday}
      </div>

      <div className={cx("space-welcome")}>
        When did you get together? {shortMonthAnniversaryFirstPersonUser}
      </div>

      <div className={cx("space-welcome")}>
        Been together for {daysTgt} days, which is <br />
        {yearsTgt} 
      </div>
      <CustomButton
          className="resident-btn"
          testId="resident"
          content="Refresh Screen"
          clicked={
            refresh
          }

          // resident={true}
        ></CustomButton>
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
