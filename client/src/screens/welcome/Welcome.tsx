import * as React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Welcome.scss";
import Couple from "../../assets/couple5.png";
import CustomButton from "../../shared/CustomButton";

const Welcome = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);

  return (
    <div className={cx("container")}>
      <img
        data-testid="img-logo-resident"
        className={cx("imageIcon")}
        src={Couple}
        alt="Logo"
      />
      <div className={cx("title")}>Couple Goals</div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Create a Couple Space"
        clicked={() => {
          navigate("/register");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Login to Couple Space"
        clicked={() => {
          navigate("/loginOptions");
        }}
      ></CustomButton>
    </div>
  );
};

export default Welcome;
