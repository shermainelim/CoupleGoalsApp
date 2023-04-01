import React, { useState, useEffect } from "react";

import "./Card.scss";
import ProgressBar from "./ProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCirclePlus,faTrashCan
  } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from "react-redux";
import { financeDelete } from "../redux/appSlice";

export const Card = ({
  spaceName,
  id,
  title,
  description,
  buttonText,
  link,
  buttonText2,
  startGoal,
  currentGoal,
  endGoal,
}) => {
  
    
    
  const dispatch = useDispatch();

    const [current, setCurrent]= useState(currentGoal);
    let currentProgress = (currentGoal/endGoal)*100;
    let incrementalGoal = (startGoal/endGoal)*100;

    useEffect(()=>{
      setCurrent(currentProgress);
    },[currentProgress])
   

    const Contribute =()=>{
        const res = current+ incrementalGoal;     
        setCurrent(res);  
    }

    const Backtrack =()=>{
        const res = current- incrementalGoal;
        
        setCurrent(res);
     
    }

    const trashCanHandler = ()=>{
      console.log("delete pressed");
      dispatch(financeDelete({ spaceName, id }));
    }

  return (
    <div className="card-container">
     <div className="card-mini-container">
      {title && <h1 className="card-title">{title}</h1>}
      <div onClick={trashCanHandler}><FontAwesomeIcon size="xl" icon={faTrashCan} /></div>
      </div>
      <div className="card-progress-bar">{<ProgressBar done={current} startGoal={startGoal} endGoal={endGoal}/>}</div>
      
      {description && <p className="card-description">{description}</p>}
   
        <div onClick={Contribute} className="card-btn-contribute">
          {buttonText}
   </div>

        <div onClick={Backtrack} className="card-btn-backtrack">
          {buttonText2}
        </div>
      
    </div>
  );
};
