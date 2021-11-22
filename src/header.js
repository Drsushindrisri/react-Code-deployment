import React from "react";
import { useHistory } from "react-router";
import styles from "./AppNew.module.scss";

const Header = (props) => {
  const history = useHistory();
  return (
    <header className={styles.Nav}>
      <div className={styles.Header_MainDivsss}>
        <SVg2 />
      </div>
      <i
        className="fas fa-chevron-left"
        onClick={() => {
          history.goBack();
        }}
      />
    </header>
  );
};
export default Header;

const SVg2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 80 1125 245"
    preserveAspectRatio
  >
    <defs>
      <linearGradient
        id="a"
        x2="1124.577"
        y1="131.552"
        y2="131.552"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#00b2b8" />
        <stop offset=".817" stop-color="#56ced4" />
      </linearGradient>
      <linearGradient
        id="b"
        x1="562.5"
        x2="562.5"
        y1="235.37"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#ffc559" />
        <stop offset="1" stop-color="#ff8717" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M0 18.867v180.176s280.024 101.685 555.478 0c248.194-104.165 569.1 19.01 569.1 19.01V18.867Z"
    />
    <path
      fill="url(#b)"
      d="M0 0v190.176s280.024 101.686 555.478 0c248.194-104.165 569.1 19.01 569.1 19.01L1125 0Z"
    />
  </svg>
);
