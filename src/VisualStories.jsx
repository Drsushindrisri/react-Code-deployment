import React from "react";
import Stories from "react-insta-stories";

const VisualStories = ({
  location: {
    state: { visualStoriesList, currentIndex },
  },
}) => (
  <Stories
    stories={visualStoriesList}
    defaultInterval={1500}
    width="100vw"
    height="100vh"
    currentIndex={currentIndex}
  />
);

export default VisualStories;