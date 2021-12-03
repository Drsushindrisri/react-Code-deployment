import React from "react";
import { useHistory } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./sass/AppNew.module.scss";

const Header = () => {
  const history = useHistory();

  const pathname = window.location.pathname;

  const showBack =
    pathname === "available-slots" ||
    pathname === "checkout" ||
    pathname === "blog/";

  return (
    <header className={styles.header__main}>
      <span className={styles.header__wave}>
        <img src="/header-wave.png" alt="Wave" />
      </span>
      {showBack && (
        <span onClick={() => history.goBack()} className={styles.header__arrow}>
          <FaChevronLeft />
        </span>
      )}
    </header>
  );
};
export default Header;
