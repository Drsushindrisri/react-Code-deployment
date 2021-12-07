import { useState } from "react";
import { uid } from "react-uid";
import { HiFilter } from "react-icons/hi";
import styles from "./sass/Blogs.module.scss";

const BlogsCategories = ({ categoriesList }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className={styles.blogs__categories__wrapper}>
      <HiFilter />
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
    </div>
  );
};

export default BlogsCategories;
