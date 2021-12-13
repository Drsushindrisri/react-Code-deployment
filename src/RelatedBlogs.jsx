import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
import styles from "./sass/RelatedBlogs.module.scss";
import { dateStringToDate } from "./utils/dateStringToDate";

const RelatedBlogs = ({ blog_id }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    getRelatedBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const getRelatedBlogs = async () => {
    try {
      const data = await fetchData(
        "getRelatedBlogs",
        "reqBody",
        { blog_id },
        "Fitapp"
      );
      setRelatedBlogs(data?.data);
    } catch (error) {}
  };

  return (
    <div className={styles.relatedBlogs__main}>
      <h4>Related Blogs</h4>
      <div className={styles.relatedBlogs__container}>
        {relatedBlogs.map((blog, ind) => (
          <div
            className={styles.relatedBlogs__blogItem}
            onClick={() => history.push(`${blog?.blogId}`)}
            key={uid(ind)}
          >
            <img src={blog?.image} alt={blog?.blog_title} />
            <div>
              <h5>{blog?.blog_title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;
