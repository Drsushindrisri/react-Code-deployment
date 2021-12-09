import React from "react";
import { useLocation, useHistory } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./sass/header.module.scss";

const Header = () => {
  const { pathname } = useLocation();
  const { goBack } = useHistory();

  const condition =
    pathname.includes("available-slots") ||
    pathname.includes("doctors-list") ||
    pathname.includes("checkout") ||
    pathname.includes("blog") ||
    pathname.includes("blogs") ||
    pathname.includes("join-fb") ||
    pathname.includes("raise-ticket");

  const redirectToHome =
    pathname.includes("blog") ||
    pathname.includes("blogs") ||
    pathname.includes("join-fb") ||
    pathname.includes("raise-ticket");

  return (
    <>
      {pathname !== "/stories" && (
        <header className={styles.header__main}>
          <span className={styles.header__wave}>
            <img src="/header-wave.png" alt="Wave" />
          </span>
          {condition && (
            <span
              onClick={() => {
                if (redirectToHome) {
                  window.location.href =
                    "uniwebview://pageredirect?pageclose=close";
                } else {
                  goBack();
                }
              }}
              className={styles.header__arrow}
            >
              <FaChevronLeft />
            </span>
          )}
        </header>
      )}
    </>
  );
};
export default Header;
