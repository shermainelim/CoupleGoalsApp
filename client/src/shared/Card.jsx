import React from "react";

import "./Card.scss";
import ProgressBar from "./ProgressBar";

export const Card = ({

  title,
  description,
  buttonText,
  link,
}) => {
  return (
    <div className="card-container">
     
      {title && <h1 className="card-title">{title}</h1>}
      <div className="card-progress-bar">{<ProgressBar done="80"/>}</div>
      
      {description && <p className="card-description">{description}</p>}
      {buttonText && link && (
        <a href={link} className="card-btn">
          {buttonText}
        </a>
      )}
    </div>
  );
};
