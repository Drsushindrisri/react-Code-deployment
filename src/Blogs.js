import React, { useEffect, useState } from "react";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
import Carousel from "react-elastic-carousel";
import styles from "./Blogs.module.scss";

const Blogs = ({ history }) => {
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const data = await fetchData("getOrganizationBlogs");
      setBlogsList(data);
    } catch (error) {}
  };

  return (
    <div className={styles.blogs__main}>
      <Carousel
        itemsToScroll={1}
        itemsToShow={1}
        showArrows={false}
        enableAutoPlay
        itemPadding={[0, 10, 0, 10]}
      >
        {blogsList.map((item, ind) => (
          <div
            key={uid(ind)}
            onClick={() =>
              history.push({
                pathname: "/blog",
                state: { blogId: item.blogId },
              })
            }
            className={styles.blogs__blogItem}
          >
            <img
              src="https://staging.s10health.in/contentImg/960x540/16355732232330.jpg"
              alt=""
              height={150}
            />
            {item.blog_title}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Blogs;
