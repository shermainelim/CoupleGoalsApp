import React, { useState, useEffect } from "react";

import "./Card.scss";
import ProgressBar from "./ProgressBar";

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

  
    let currentProgress = (currentGoal/endGoal)*100;
    let incrementalGoal = (startGoal/endGoal)*100
    

    const [current, setCurrent]= useState(currentProgress)

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
     
      {title && <h1 className="card-title">{title}</h1>}
      <div className="card-progress-bar">{<ProgressBar done={current}/>}</div>
      
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
