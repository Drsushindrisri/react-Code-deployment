import React from "react";
import Stories from "react-insta-stories";
import styles from "./sass/VisualStories.module.scss";
import { VscChromeClose } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

const VisualStories = ({
  location: {
    state: { visualStoriesList, currentIndex },
  },
}) => {
  const { goBack } = useHistory();

  return (
    <div className={styles.visualStories__main}>
      <header className={styles.visualStories__header_container}>
        <VscChromeClose onClick={goBack} />
      </header>
      <Stories
        stories={visualStoriesList}
        defaultInterval={1500}
        width="100vw"
        height="100vh"
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default VisualStories;
