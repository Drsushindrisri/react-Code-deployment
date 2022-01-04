import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { fetchData } from "./Api/Apis";
import { VisualStoriesList } from "./Blogs";
import BlogsCategories from "./BlogsCategories";
import styles from "./sass/Blog.module.scss";
import { EmailShareButton } from "react-share";
import { useParams, useLocation } from "react-router";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import { dateStringToDate } from "./utils/dateStringToDate";
import RelatedBlogs from "./RelatedBlogs";
import { getScrollPos } from "./utils/getScrollPos";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const BlogsByCategory = ({ blogs }) => (
  <div className={styles.blog__blogsByCategory__main}>
    {blogs.map((blog, ind) => (
      <div
        className={`${styles.blog__blogsByCategory__item} ${
          ind < blogs.length - 1 &&
          styles.blog__blogsByCategory__item__with_border
        }`}
        key={uid(ind)}
      >
        <h4>{blog?.blog_title}</h4>
        {blog?.postdate && (
          <span>{format(dateStringToDate(blog?.postdate), "PPP")}</span>
        )}
        <p>{blog?.description && blog?.description.slice(0, 100)}...</p>
        <Link to={`${blog?.blogId}`}>
          Read more&nbsp; <ArrowRight />
        </Link>
      </div>
    ))}
  </div>
);

const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [visualStoriesList, setVisualStoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
    getVisualStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();
  const blogPath = useLocation();

  useEffect(() => {
    if (params?.id) {
      getBlog(params?.id);
    }

    if (selectedCategory) {
      setSelectedCategory("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogPath.pathname]);

  const getBlog = async (blogId) => {
    try {
      const data = await fetchData("viewBlogs", "reqBody", {
        blogId,
        OrganizationID: sessionStorage.getItem("orgId"),
      });
      setBlog({
        ...data?.data,
        description: (data?.data?.description || "")
          .toString()
          .replace(/(<a[^>]+?>|<a>|<\/a>)/gim, ""),
      });
      if (getScrollPos() !== 0) {
        scrollToTop();
      }
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
      setBlogs(data?.data || []);
    } catch (error) {}
  };

  const getVisualStories = async () => {
    try {
      const data = await fetchData("getVisualStories", "reqBody", {
        OrganizationID: sessionStorage.getItem("orgId"),
      });
      setVisualStoriesList(
        (data?.data || []).map((item) => ({
          url: item?.image || "",
          title: item?.storyTitle,
        }))
      );
    } catch (error) {}
  };

  const handleShare = (postTitle) => {
    if (navigator.share) {
      navigator
        .share({
          title: "",
          text: `Check out ${postTitle} on S10-fit`,
          url: document.location.href,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  const filteredList = blogs.filter(
    (obj) => obj.category_id === selectedCategory
  );

  return (
    <div className={`page-safeareas ${styles.blog__main}`}>
      <VisualStoriesList list={visualStoriesList} history={props.history} />
      <div className="ruler-horizontal" />
      <BlogsCategories
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />
      {selectedCategory ? (
        <BlogsByCategory blogs={filteredList} />
      ) : (
        <>
          {blog?.image && <img src={blog?.image} alt={blog?.blog_title} />}
          <div className={styles.blog__content}>
            <h3>{blog?.blog_title}</h3>
            {blog?.time && (
              <div className={styles.blog__time}>
                {format(dateStringToDate(blog?.time), "PPP")}
              </div>
            )}

            <div className={styles.blog__shareContainer}>
              <EmailShareButton url={window.location.href}>
                <MailIcon />
              </EmailShareButton>
              <button onClick={() => handleShare(blog?.blog_title)}>
                <ShareIcon />
              </button>
            </div>

            <p dangerouslySetInnerHTML={{ __html: blog?.description }} />
          </div>
          <div className={styles.blog__scrollToTop} onClick={scrollToTop}>
            <ArrowUp />
          </div>
        </>
      )}
      <div className="ruler-horizontal" />

      <RelatedBlogs blog_id={params?.id} />
    </div>
  );
};

export default Blog;

const ArrowUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    class="bi bi-chevron-up"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#de5246 "
    class="bi bi-envelope"
    viewBox="0 0 16 16"
  >
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
  </svg>
);

const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    class="bi bi-share"
    viewBox="0 0 16 16"
  >
    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

export const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-arrow-right"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
);
