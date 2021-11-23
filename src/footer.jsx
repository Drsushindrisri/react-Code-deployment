import React from "react";
import { useHistory } from "react-router";
import styles from "./sass/AppNew.module.scss";

const Footer = () => {
  const history = useHistory();
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "5 auto",
      }}
      className={styles.Navv}
    >
      <div>
        <i
          className="fas fa-calendar"
          style={{
            fontSize: "25px",
            color: "white",
            margin: "10px 0px 0px 30px",
          }}
        />
        <p className="previous">Previous Booking </p>
      </div>
      <div>
        {" "}
        <i
          onClick={() => {
            history.goBack();
          }}
          className="backoption fas fa-chevron-left"
          style={{ fontSize: "38px", color: "white" }}
        />
        <p className="back">Back</p>
      </div>
    </footer>
  );
};
export default Footer;
