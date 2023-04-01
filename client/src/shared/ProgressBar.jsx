import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProgressBar.scss";

const ProgressBar = ({ starterGoal, currentSaved, enderGoal }) => {
  const cx = classNames.bind(styles);
  const [style, setStyle] = useState({});

  const currentGoal = currentSaved;
  const endGoal = enderGoal;
  const startGoal = starterGoal;

   console.log("CurrentGoal", currentGoal);
   console.log("endGoal", endGoal);
   console.log("Startgoal", startGoal);

   let currentProgress = (currentGoal/endGoal) * 100

  const [current, setCurrent] = useState(currentProgress);
  
  let incrementalGoal = (startGoal/endGoal) * 100;


  console.log("Current", current)
  console.log("Currentprog", currentProgress);
  console.log("incrementgoal", incrementalGoal);


  useEffect(() => {
    setCurrent(currentProgress);
  }, [currentProgress]);

  const Contribute = () => {
	console.log("pressed")
    const res = current + incrementalGoal;
    setCurrent(res);
  };

  const Backtrack = () => {
    const res = current - incrementalGoal;

    setCurrent(res);
  };

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${current}%`,
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className={cx("progress")}>
      <div className={cx("progress-done")} style={style}>
        {current}%
      </div>
      <div className={cx("progress-start-end")}>
        <div className={cx("progress-start")}>{startGoal}</div>
        <div className={cx("progress-end")}>{endGoal}</div>
      </div>

      <div onClick={Contribute} className="pro-card-btn-contribute">
        Contribute
      </div>

      <div onClick={Backtrack} className="pro-card-btn-backtrack">
        Backtrack
      </div>
    </div>
  );
};

export default ProgressBar;
