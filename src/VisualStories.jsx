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
        stories={visualStoriesList.map((story) => ({
          ...story,
          content: (content) => (
            <div className={styles.visualStories__story}>
              <img src={content?.story?.url} alt={content?.story?.title} />
              <h1>{content?.story?.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: content?.story?.desc }} />
            </div>
          ),
        }))}
        defaultInterval={3000}
        width="100vw"
        height="100vh"
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default VisualStories;
