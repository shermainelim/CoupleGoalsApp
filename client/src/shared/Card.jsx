import React, { useState, useEffect } from "react";

import "./Card.scss";
import ProgressBar from "./ProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCirclePlus,faTrashCan
  } from '@fortawesome/free-solid-svg-icons'


export const Card = ({

  title,
  description,
  buttonText,
  link,
  buttonText2,
  startGoal,
  currentGoal,
  endGoal,
}) => {

  console.log("Card title", title);
  console.log("Card start", startGoal);
  console.log("Card cuyrrent", currentGoal);
  console.log("Card end", endGoal);
  
    
    

    const [current, setCurrent]= useState(currentGoal);
    let currentProgress = (currentGoal/endGoal)*100;
    let incrementalGoal = (startGoal/endGoal)*100;

    useEffect(()=>{
      setCurrent(currentProgress);
    },[currentProgress])
   


    console.log("current finance progress" , current);

    const Contribute =()=>{
        const res = current+ incrementalGoal;
        
        setCurrent(res);
        console.log("current", current)
    }

    const Backtrack =()=>{
        const res = current- incrementalGoal;
        
        setCurrent(res);
        console.log("current", current)
    }

  return (
    <div className="card-container">
     <div className="card-mini-container">
      {title && <h1 className="card-title">{title}</h1>}
      <FontAwesomeIcon size="xl" icon={faTrashCan} /></div>
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
