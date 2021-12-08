import React, { useEffect, useState } from "react";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
import Carousel from "react-elastic-carousel";
import styles from "./sass/Blogs.module.scss";
import "./sass/Blogs.scss";
import BlogsCategories from "./BlogsCategories";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export const VisualStoriesList = ({ list, history }) => (
  <>
    <h5>Visual Stories</h5>
    <div className={styles.visualStoriesContainer}>
      {list.map((it, ind) => (
        <img
          src={it}
          alt={`story-${ind + 1}`}
          onClick={() =>
            history.push({
              pathname: "/stories",
              state: { visualStoriesList: list, currentIndex: ind },
            })
          }
        />
      ))}
    </div>
  </>
);

const Blogs = ({ history }) => {
  const [blogsList, setBlogsList] = useState([]);
  const [visualStoriesList, setVisualStoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getBlogs();
    getVisualStories();
  }, []);

  const getVisualStories = async () => {
    try {
      const data = await fetchData("getVisualStories");
      setVisualStoriesList(data.map((item) => item?.image || ""));
    } catch (error) {}
  };

  const getBlogs = async () => {
    try {
      const data = await fetchData(
        "getOrganizationBlogs",
        "formData",
        { User_ID: 235 },
        "Fitapp"
      );
      setBlogsList(data);
    } catch (error) {}
  };

  const likeBlog = async (blog_id) => {
    try {
      await fetchData(
        "saveOrganizationBlogsLikes",
        "formData",
        { blog_id, User_ID: 235 },
        "Fitapp"
      );
      getBlogs();
    } catch (error) {}
  };

  const obj = {
    itemsToScroll: 1,
    itemsToShow: 1,
    showArrows: false,
    enableAutoPlay: false,
    itemPadding: [0, 10, 0, 10],
    className: "blogs_carousel",
  };

  const filteredList = blogsList.filter(
    (obj) => obj.category_id === selectedCategory
  );

  return (
    <div className={`page-safeareas ${styles.blogs__main}`}>
      <VisualStoriesList list={visualStoriesList} history={history} />
      <div className="ruler-horizontal" />
      <BlogsCategories
        selectedCategory={selectedCategory}
        onChange={(newCat) => setSelectedCategory(newCat)}
      />
      <h5>Blogs</h5>
      <Carousel {...obj}>
        {(selectedCategory ? filteredList : blogsList).map(
          ({ blogId, blog_title, image, userLiked }, ind) => (
            <div key={uid(ind)} className={styles.blogs__blogItem}>
              <img
                src={image}
                alt={blog_title}
                onClick={() =>
                  history.push({
                    pathname: `/blog/${blogId}`,
                    state: { blogId },
                  })
                }
              />
              <div className={styles.blogs__blogItemFooter}>
                <span className={styles.blogs__blogTitle}>{blog_title}</span>
                <span
                  className={`${styles.blogs__likeButton} ${
                    userLiked && styles.blogs__likeButtonFilled
                  }`}
                  onClick={() => {
                    likeBlog(blogId);
                  }}
                >
                  {userLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
                </span>
              </div>
            </div>
          )
        )}
      </Carousel>
    </div>
  );
};

export default Blogs;
