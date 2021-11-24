import { useEffect, useState } from "react";
import styles from "./sass/AppNew.module.scss";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";

export const App = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const resp = await fetchData("getPrimarySpecialtyList");
      setData(resp);
    } catch (error) {}
  }

  return (
    <div className={styles.Treatements_mainDiv}>
      <h3 className={styles.treatment_header}>Book Doctor Appointment</h3>
      <div className={styles.treatments_sliderspeciality}>
        <i className="fa fa-sliders" />
        <span className={styles.treatments_header1}>
          Choose Doctor by speciality
        </span>
      </div>
      <div className={styles.TreatmentsContainer}>
        {data.map((item, ind) => (
          <div className={styles.treatmentItem} key={uid(ind)}>
            <img src={item.image} alt="" className={styles.Treatement_Images} />

            <p onClick={() => props.history.push("/doctors-list")}>
              {item.speciality_name}
            </p>
          </div>
        ))}
      </div>{" "}
      <br />
    </div>
  );
};
