import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { fetchData } from "./Api/Apis";
import { VisualStoriesList } from "./Blogs";
import BlogsCategories from "./BlogsCategories";
import styles from "./sass/Blog.module.scss";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import { useParams } from "react-router";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import { dateStringToDate } from "./utils/dateStringToDate";
import RelatedBlogs from "./RelatedBlogs";
import { getScrollPos } from "./utils/getScrollPos";

const BlogsByCategory = ({ blogs, setSelectedCategory }) => (
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
        <Link to={`${blog?.blogId}`} onClick={() => setSelectedCategory("")}>
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

  useEffect(() => {
    if (params?.id) {
      getBlog(params?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getBlog = async (blogId) => {
    try {
      const data = await fetchData("viewBlogs", "reqBody", { blogId });
      setBlog(data?.data);
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
        { User_ID: 235 },
        "Fitapp"
      );
      setBlogs(data?.data || []);
    } catch (error) {}
  };

  const getVisualStories = async () => {
    try {
      const data = await fetchData("getVisualStories");
      setVisualStoriesList((data?.data || []).map((item) => item?.image || ""));
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
        <BlogsByCategory
          blogs={filteredList}
          setSelectedCategory={setSelectedCategory}
        />
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
            <p>{blog?.description}</p>
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

const FBIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#4267B2"
    class="bi bi-facebook"
    viewBox="0 0 16 16"
  >
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
  </svg>
);

const WAIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#25D366"
    class="bi bi-whatsapp"
    viewBox="0 0 16 16"
  >
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

const TWIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#1DA1F2"
    class="bi bi-twitter"
    viewBox="0 0 16 16"
  >
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>
);

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
