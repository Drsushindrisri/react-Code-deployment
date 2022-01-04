import React from "react";
import { useLocation, useHistory } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./sass/header.module.scss";

const Header = () => {
  const { pathname } = useLocation();
  const { goBack } = useHistory();

  const condition =
    pathname === "/available-slots" ||
    pathname.includes("blog") ||
    pathname === "/blogs" ||
    pathname === "/join-fb" ||
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
                redirectToHome
                  ? (window.location.href =
                      "uniwebview://pageredirect?pageclose=close")
                  : goBack();
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
      <linearGradient id="MyGradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="30%" stop-color="hsla(0, 0%, 100%, 1)" />
        <stop offset="55%" stop-color="hsla(32, 100%, 50%, 1)" />
      </linearGradient>
    </defs>
    <path
      fill="url(#MyGradient)"
      d="M0 18.867v180.176s280.024 101.685 555.478 0c248.194-104.165 569.1 19.01 569.1 19.01V18.867Z"
    />
  </svg>
);
