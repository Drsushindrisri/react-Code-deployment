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
          src={it?.url}
          alt={`story-${ind + 1}`}
          onClick={() =>
            history.push({
              pathname: "/stories",
              state: {
                visualStoriesList: it?.stories || [],
                currentIndex: ind,
              },
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
      const data = await fetchData("getVisualStories", "reqBody", {
        OrganizationID: sessionStorage.getItem("orgId"),
      });
      setVisualStoriesList(
        (data?.data || []).map((item) => ({
          url: item?.image || "",
          title: item?.storyTitle,
          desc: item?.short_description,
          stories: item?.stories,
        }))
      );
    } catch (error) {}
  };

  const getBlogs = async () => {
    try {
      const data = await fetchData(
        "getOrganizationBlogs",
        "formData",
        { User_ID: sessionStorage.getItem("userId") },
        "Fitapp"
      );
      setBlogsList(data?.data || []);
    } catch (error) {}
  };

  const likeBlog = async (blog_id) => {
    try {
      await fetchData(
        "saveOrganizationBlogsLikes",
        "formData",
        { blog_id, User_ID: sessionStorage.getItem("userId") },
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
    (obj) => obj?.category_id === selectedCategory
  );

  return (
    <div className={`page-safeareas ${styles.blogs__main}`}>
      <VisualStoriesList list={visualStoriesList} history={history} />
      <div className="ruler-horizontal" />
      <BlogsCategories
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />
      <h5>Blogs</h5>
      <Carousel {...obj}>
        {(selectedCategory ? filteredList : blogsList).map((blog, ind) => (
          <div key={uid(ind)} className={styles.blogs__blogItem}>
            <img
              src={blog?.image}
              alt={blog?.blog_title}
              onClick={() =>
                history.push({
                  pathname: `/blog/${blog?.blogId}`,
                  state: { blogId: blog?.blogId },
                })
              }
            />
            <div className={styles.blogs__blogItemFooter}>
              <span className={styles.blogs__blogTitle}>
                {blog?.blog_title}
              </span>
              <span
                className={`${styles.blogs__likeButton} ${
                  blog?.userLiked && styles.blogs__likeButtonFilled
                }`}
                onClick={() => {
                  likeBlog(blog?.blogId);
                }}
              >
                {blog?.userLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Blogs;
