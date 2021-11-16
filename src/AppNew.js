import { useEffect, useState } from "react";
import styles from "./AppNew.module.scss";
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
      setData(resp.data);
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
          <div className={styles.TreatmentItems} key={uid(ind)}>
            <img src={item.image} alt="" className={styles.Treatement_Images} />

            <button
              className={styles.treatmentsList}
              onClick={() => props.history.push("/doctors-list")}
            >
              {item.speciality_name}
            </button>
          </div>
        ))}
      </div>{" "}
      <br />
    </div>
  );
};
