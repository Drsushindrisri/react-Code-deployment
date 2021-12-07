import { useEffect, useState } from "react";
import { uid } from "react-uid";
import { HiFilter } from "react-icons/hi";
import styles from "./sass/Blogs.module.scss";
import { fetchData } from "./Api/Apis";

const BlogsCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    getBlogCategories();
  }, []);

  const getBlogCategories = async () => {
    try {
      const data = await fetchData("getCategoryList");
      setCategoriesList(data);
    } catch (error) {}
  };

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
