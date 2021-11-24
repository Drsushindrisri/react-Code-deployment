import { useEffect, useState } from "react";
import styles from "./sass/AppNew.module.scss";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
// import Footer from "./footer";
// import SlotBookAppointment from "./BookAppointment";

export const DoctorsList = (props) => {
  const [doctors, setDoctors] = useState({ real: [], modify: [] });

  useEffect(() => {
    getDoctorsList();
  }, []);

  async function getDoctorsList() {
    try {
      const resp = await fetchData("getDoctorsList");
      setDoctors({ real: resp, modify: resp });
    } catch (error) {}
  }

  return (
    <div className={styles.Doctors_Container}>
      {(Array.isArray(doctors.modify) ? doctors.modify : []).map(
        (item, ind) => (
          <div className={styles.DoctorsList_Items} key={uid(ind)}>
            <img className={styles.Doctors_Image} src={item.image} alt="" />
            <span style={{ width: "10px" }}></span>
            <div>
              <h4 className={styles.Doctors_Names}> {item.docName}</h4>
              <p>
                <span className={styles.doctors_Pgblock}>
                  PG in Nutrition & Dietetics
                </span>
                <p className={styles.doctors_Specialitynames}>
                  {item.speciality_name}
                </p>
              </p>
              <div className="flex-container">
                <button
                  onClick={() => {
                    props.history.push({
                      pathname: "/Slot-BookAppointment",
                      state: {
                        name: item.docName,
                        image: item.docProfileImg,
                        speciality: item.speciality_name,
                      },
                    });
                  }}
                  className={styles.DoctorsAppointment_Booknow}
                >
                  {" "}
                  Book Now
                </button>
                {""}
                {""}
                <button
                  onClick={() => {
                    props.history.push("/OrgDoctorFees");
                  }}
                  className={styles.Doctors_Consultant}
                >
                  Consultant Online
                </button>
              </div>{" "}
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default DoctorsList;
