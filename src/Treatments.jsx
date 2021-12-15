import { useEffect, useState } from "react";
import styles from "./sass/Treatments.module.scss";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
import { Abstract1, Abstract2, HeartPulse } from "./svg/Blobs";

const Treatments = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const resp = await fetchData("getPrimarySpecialtyList");
      setData(resp?.data);
    } catch (error) {}
  }

  return (
    <div className={`page-safeareas ${styles.treatments__main}`}>
      <h3 className="page-header">Choose Doctor by speciality</h3>
      <div className={styles.treatments__list}>
        {data.map((item, ind) => (
          <div
            className={styles.treatmentItem}
            key={uid(ind)}
            onClick={() => props.history.push("/doctors-list")}
          >
            <img
              src={item?.image}
              alt=""
              className={styles.Treatement_Images}
            />

            <span>{item?.speciality_name}</span>
          </div>
        ))}
      </div>

      <span className={styles.treatments__abstract1}>
        <Abstract1 />
      </span>
      <span className={styles.treatments__abstract2}>
        <Abstract1 />
      </span>
      <span className={styles.treatments__abstract3}>
        <Abstract2 />
      </span>
      <br />
    </div>
  );
};

export default Treatments;
