import React from "react";

import "./Card.scss";
import ProgressBar from "./ProgressBar";

export const Card = ({

  title,
  description,
  buttonText,
  link,
  buttonText2,
}) => {
  return (
    <div className="card-container">
     
      {title && <h1 className="card-title">{title}</h1>}
      <div className="card-progress-bar">{<ProgressBar done="80"/>}</div>
      
      {description && <p className="card-description">{description}</p>}
   
        <a href={link} className="card-btn-contribute">
          {buttonText}
   </a>

        <a href={link} className="card-btn-backtrack">
          {buttonText2}
        </a>
      
    </div>
  );
};
