import { useContext } from "react";
import styles from "./sass/Treatments.module.scss";
import { uid } from "react-uid";
import { Abstract1, Abstract2 } from "./svg/Blobs";
import { SpecialitiesValueContext } from "./contexts/SpecalitiesList";

const Treatments = (props) => {
  const data = useContext(SpecialitiesValueContext);

  return (
    <div className={`page-safeareas ${styles.treatments__main}`}>
      <h3 className="page-header">Choose Doctor by speciality</h3>
      <div className={styles.treatments__list}>
        {data.map((item, ind) =>
          item?.speciality_id !== "all" ? (
            <div
              className={styles.treatmentItem}
              key={uid(ind)}
              onClick={() => props.history.push("/doctors-list")}
            >
              <span>{item?.speciality_name}</span>
            </div>
          ) : (
            ""
          )
        )}
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
