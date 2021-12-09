import React from "react";
import { useLocation, useHistory } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./sass/header.module.scss";

const Header = () => {
  const { pathname } = useLocation();
  const { goBack } = useHistory();

  const condition =
    pathname.includes("available-slots") ||
    pathname.includes("checkout") ||
    pathname.includes("blog");

  return (
    <header className={styles.header__main}>
      <span className={styles.header__wave}>
        <img src="/header-wave.png" alt="Wave" />
      </span>
      {condition && (
        <span onClick={goBack} className={styles.header__arrow}>
          <FaChevronLeft />
        </span>
      )}
    </header>
  );
};
export default Header;
