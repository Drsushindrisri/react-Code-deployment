import React, { useEffect, useState } from "react";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
import Carousel from "react-elastic-carousel";
import styles from "./sass/Blogs.module.scss";

const Blogs = ({ history }) => {
  const [blogsList, setBlogsList] = useState([]);
  const [visualStoriesList, setVisualStoriesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
    <div className={`page-content ${styles.blogs__main}`}>
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
      <div className={styles.blogs__categoriesContainer}>
        {categoriesList.map((item, ind) => (
          <div
            className={`${styles.blog__categoryItem} ${
              selectedCategory === item?.categoryName &&
              styles.blog__categoryItemSelected
            }`}
            key={uid(ind)}
            onClick={() => setSelectedCategory(item?.categoryName)}
          >
            {item?.categoryName}
          </div>
        ))}
      </div>
      <h5>Blogs</h5>
      <Carousel {...obj}>
        {blogsList.map(({ blogId, blog_title }, ind) => (
          <div
            key={uid(ind)}
            onClick={() =>
              history.push({
                pathname: `/blog/${blog_title}`,
                state: { blogId },
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
