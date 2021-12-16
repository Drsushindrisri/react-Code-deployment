import React from "react";
import { useLocation, useHistory } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./sass/header.module.scss";

const Header = () => {
  const { pathname } = useLocation();
  const { goBack } = useHistory();

  const condition =
    pathname === "/available-slots" ||
    pathname === "/doctors-list" ||
    pathname.includes("blog") ||
    pathname === "/blogs" ||
    pathname === "/join-fb" ||
    pathname === "/" ||
    pathname === "/raise-ticket";

  const redirectToHome =
    pathname === "/" ||
    pathname === "/blogs" ||
    pathname === "/join-fb" ||
    pathname === "/raise-ticket" ||
    pathname.includes("blog");

  return (
    <>
      {pathname !== "/stories" && (
        <header className={styles.header__main}>
          <span className={styles.header__wave}>
            <WaveSvg />
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

const WaveSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 80 1125 245">
    <defs>
      <linearGradient
        id="a"
        x2="1124.577"
        y1="131.552"
        y2="131.552"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#00b2b8" />
        <stop offset=".817" stopColor="#56ced4" />
      </linearGradient>
      <linearGradient
        id="b"
        x1="562.5"
        x2="562.5"
        y1="235.37"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ffc559" />
        <stop offset="1" stopColor="#ff8717" />
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
