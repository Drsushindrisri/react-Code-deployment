import React, { useEffect, useState } from "react";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";

const Blogs = () => {
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
    <div>
      {blogsList.map((item, ind) => (
        <div key={uid(ind)}></div>
      ))}
    </div>
  );
};

export default Blogs;
