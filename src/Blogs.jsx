import React, { useEffect, useState } from "react";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
import Carousel from "react-elastic-carousel";
import styles from "./sass/Blogs.module.scss";
import BlogsCategories from "./BlogsCategories";

const Blogs = ({ history }) => {
  const [blogsList, setBlogsList] = useState([]);
  const [visualStoriesList, setVisualStoriesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    getBlogs();
    getVisualStories();
    getBlogCategories();
  }, []);

  const getVisualStories = async () => {
    try {
      const data = await fetchData("getVisualStories");
      setVisualStoriesList(data.map((item) => item.image));
    } catch (error) {}
  };

  const getBlogs = async () => {
    try {
      const data = await fetchData("getOrganizationBlogs");
      setBlogsList(data);
    } catch (error) {}
  };

  const getBlogCategories = async () => {
    try {
      const data = await fetchData("getCategoryList");
      setCategoriesList(data);
    } catch (error) {}
  };

  const obj = {
    itemsToScroll: 1,
    itemsToShow: 1,
    showArrows: false,
    enableAutoPlay: true,
    itemPadding: [0, 10, 0, 10],
  };

  return (
    <div className={`page-safeareas ${styles.blogs__main}`}>
      <h5>Visual Stories </h5>
      <div className={styles.visualStoriesContainer}>
        {visualStoriesList.map((it, ind) => (
          <img
            src={it}
            alt={`story-${ind + 1}`}
            onClick={() =>
              history.push({
                pathname: "/stories",
                state: { visualStoriesList, currentIndex: ind },
              })
            }
          />
        ))}
      </div>
      <BlogsCategories categoriesList={categoriesList} />
      <h5>Blogs</h5>
      <Carousel {...obj}>
        {blogsList.map(({ blogId, blog_title }, ind) => (
          <div
            key={uid(ind)}
            onClick={() =>
              history.push({
                pathname: `/blog/${blog_title}`,
                state: { blogId, categoriesList },
              })
            }
            className={styles.blogs__blogItem}
          >
            <img
              src="https://staging.s10health.in/contentImg/960x540/16355732232330.jpg"
              alt=""
              height={150}
            />
            {blog_title}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Blogs;
