import React, { useEffect, useState } from "react";
import { fetchData } from "./Api/Apis";

const Blog = (props) => {
  const [blog, setBlog] = useState({});

  const blogId = props?.location?.state?.blogId;

  useEffect(() => {
    getBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBlog = async () => {
    try {
      const data = await fetchData("getOrganizationBlogs", true, { blogId });
      setBlog(data);
    } catch (error) {}
  };

  return <div>{blog}</div>;
};

export default Blog;
