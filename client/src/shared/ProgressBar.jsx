import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProgressBar.scss";

const ProgressBar = ({done, startGoal,endGoal}) => {
    const cx = classNames.bind(styles);
	const [style, setStyle] = useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
		<div className={cx("progress")}>
			<div className={cx("progress-done")} style={style}>
				{done}%
			</div>
            <div className={cx("progress-start-end")}>
            <div className={cx("progress-start")}>{startGoal}</div>
            <div className={cx("progress-end")}>{endGoal}</div>
            </div>
        </div>
	)
}

export default ProgressBar;