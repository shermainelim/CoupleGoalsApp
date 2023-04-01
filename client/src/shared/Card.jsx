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
 todoFinance,
deleteFinance
}) => {
  
  console.log("finance", todoFinance)

  return (
    <>
    {todoFinance && todoFinance.map((ele)=>{
      return(
<div className="card-container">
    
    <div className="card-mini-container">
     
     <h1 className="card-title">{ele.title}</h1>
     <div onClick={deleteFinance}><FontAwesomeIcon size="xl" icon={faTrashCan} /></div>
     </div>
     <div className="card-progress-bar">{<ProgressBar starterGoal={ele.startGoal} currentSaved={ele.currentSaved}  enderGoal={ele.endGoal}/>}</div>
     <p className="card-description">{ele.description}</p>
  
      
   </div>
      )
    })
    }
    </>
    
  );
};
