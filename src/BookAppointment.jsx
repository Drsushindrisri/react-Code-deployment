import { fetchData } from "./Api/Apis";
import { useEffect, useState } from "react";
import styles from "./sass/AppNew.module.scss";
import { uid } from "react-uid";
import { AiFillStar } from "react-icons/ai";

const SlotBookAppointment = (props) => {
  const [BookAppointment, setBookAppointment] = useState([]);

  useEffect(() => {
    getSlotBookAppointment();
  }, []);

  async function getSlotBookAppointment() {
    try {
      const resp = await fetchData("getBookAppointment");
      setBookAppointment(resp);
    } catch (error) {}
  }

  return (
    <div>
      <div className={styles.BookDoctors_div}>
        <img
          src="/image/Male Doc.jpg"
          className={styles.BookDoctors_Profile}
          alt=""
        />
      </div>
      <div className={styles.Book_Fivestars}>
        <br />
        <h2 className={styles.BookAppointment_Dr}>Dr. Sushindri Sridharan</h2>
        <p className={styles.BookAppointment_Stars}>Specialization</p>
        <AiFillStar style={{ fontSize: "40px", color: "#f5d809" }} />
        <AiFillStar style={{ fontSize: "40px", color: "#f5d809" }} />
        <AiFillStar style={{ fontSize: "40px", color: "#f5d809" }} />
        <AiFillStar style={{ fontSize: "40px", color: "#f5d809" }} />
        <AiFillStar style={{ fontSize: "40px", color: "#62540b" }} />
      </div>
      <hr className={styles.BookAppointment_hre} />
      <div>
        <h3 className={styles.BookAppointment_Appointment}>
          Book Your Appointment
        </h3>
      </div>
      <div>
        <div className={styles.BookAppointment_flex_container}>
          <input type="date" required="required" />
        </div>
        <br></br>
      </div>
      <br></br>
      <div className="grid-container">
        {BookAppointment.map((item, ind) => (
          <button className={styles.BookAppointment_Times} key={uid(ind)}>
            {item.Time}{" "}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          props.history.push("/OrgDoctorFees");
        }}
        className={styles.BookAppointment}
      >
        Book Your Appointment
      </button>
    </div>
  );
};

export default SlotBookAppointment;

// <input className={styles.Book_DOB} type="date" />
