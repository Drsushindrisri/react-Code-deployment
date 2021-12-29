import React from "react";
import { uid } from "react-uid";
import styles from "./sass/freeTrial.module.scss";
import { Food } from "./svg/Food";
import { GiRoundStar, GiRingingBell } from "react-icons/gi";
import { Bell } from "./svg/Bell";

const items = [
  {
    icon: <Food />,
    day: "Today",
    description: "Utilize your full access to 500+ Diet plans and workout",
  },
  {
    icon: <GiRingingBell />,
    day: "Day 5",
    description: "Get a reminder of when your trial will end",
  },
  {
    icon: <GiRoundStar />,
    day: "Day 7",
    description:
      "Enjoying or app? And would you like to lead a stunning life? Subscribe!",
  },
];

const FreeTrial = () => {
  return (
    <div
      className={`page-safeareas page-padding-top ${styles.freeTrial__main}`}
    >
      {items.map((item, ind) => (
        <div className={styles.freeTrial__itemOne} key={uid(ind)}>
          <div className={styles.freeTrial__icon}>{item.icon}</div>
          <p className={styles.freeTrial__customText}>{item.day}</p>
          <p className={styles.freeTrial__desc}>{item.description}</p>
          <div className={styles.freeTrial__verticalDivider} />
        </div>
      ))}
      <div className="center-children-h">
        <button className={styles.freeTrial__submit}>
          Start your 7 days free trial
        </button>
      </div>
    </div>
  );
};

export default FreeTrial;
