import { fetchData } from "./Api/Apis";
import { useEffect, useState } from "react";
import { EmptyState } from "./svg/EmptyState";
import { uid } from "react-uid";
import { getDaysInMonth } from "./utils/getDaysInMonth";
import { format } from "date-fns";
import ReactModal from "react-modal";
import styles from "./sass/BookAppointment.module.scss";
import "./sass/BookAppointment.scss";
import { SuccessAlert } from "./SuccessAlert";
import { dateFormat } from "./utils/dateFormat";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const infos = [
  { int: 9, desc: "years of experience" },
  { int: 1347, desc: "happy patients" },
  { int: 5, desc: "mins from you" },
];

const SlotBookAppointment = (props) => {
  const [bookAppointment, setBookAppointment] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [modalOpen, setModalOpen] = useState(false);
  const [patientInfo, setPatientInfo] = useState({});
  const [fees, setFees] = useState({});

  useEffect(() => {
    getSlotBookAppointment();
    getPatientInfo();
    getDocFees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  const doctorDetails = {
    name: props?.location?.state?.name,
    image: props?.location?.state?.image,
    speciality: props?.location?.state?.speciality,
    id: +props?.location?.state?.id,
    docWlocId: +props?.location?.state?.docWlocId,
  };

  async function getSlotBookAppointment() {
    try {
      const resp = await fetchData("getDoctorsAppointmentSlots", "formData", {
        OrganizationID: 23,
        OrgMainLocationID: 6327,
        appDate: selectedDay,
        DoctorID: doctorDetails.id,
      });
      setBookAppointment(resp?.data);
    } catch (error) {}
  }

  async function getDocFees() {
    try {
      const resp = await fetchData("getOrgDoctorFees");
      setFees(
        resp?.data.find((doc) => doc.mainprovider_id == doctorDetails?.id)
      );
    } catch (error) {}
  }

  const getPatientInfo = async () => {
    try {
      const res = await fetchData(
        "getPatientInfo",
        "reqBody",
        {
          patientId: 927,
          organizationId: 23,
        },
        "Billing"
      );

      setPatientInfo(res?.data?.[0]);
    } catch (error) {}
  };
  const createAppointment = async () => {
    try {
      await fetchData(
        "createAppointment",
        "reqBody",
        {
          LocationId: patientInfo.practicelocat_id,
          PatientId: "927",
          ProviderId: fees?.provider_id,
          MainProviderId: fees?.mainprovider_id,
          appDate: dateFormat(selectedDay),
          appReasonId: "17",
          duration: 30,
          sTime: selectedTime.slice(0, 5),
          eTime: "",
          organizationId: 23,
          USER_ID: 927,
          MainLocationId: doctorDetails?.docWlocId,
          PatientMainId: patientInfo.patient_mainid,
          PatientCode: patientInfo.pid,
          appStatusId: 1,
        },
        "Appointment"
      );
      toggleModal();
    } catch (error) {}
  };

  const isConsult = props?.location?.state?.type === "consult";

  const toggleModal = () => setModalOpen((p) => !p);

  return (
    <>
      <SuccessAlert modalOpen={modalOpen} toggleModal={toggleModal} />
      <div className={styles.bookAppointment__main}>
        <div className={styles.bookAppointment__doctorDetails}>
          <img
            src="https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="doctor"
          />
          <h3>{doctorDetails.name}</h3>
          <p>{doctorDetails.speciality}</p>
          <div className={styles.bookAppointment__doctorInfos}>
            {infos.map((item, ind) => (
              <div key={uid(ind)}>
                <span>{item.int}</span>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bookAppointment__availableSlots}>
          <div className={styles.bookAppointment__dateContainer}>
            <h6>Date</h6>
            <select
              onChange={(e) =>
                setSelectedMonth(
                  months.find((m) => m.label === e.target.value).value
                )
              }
            >
              {months
                .slice(new Date().getMonth(), months.length)
                .map((month, i) => (
                  <option key={uid(i)}>{month.label}</option>
                ))}
            </select>
          </div>
          <div className={styles.bookAppointment__days}>
            {getDaysInMonth(selectedMonth - 1).map((day, i) => {
              const formattedDay = format(day, "yyyy-MM-dd");
              return (
                <div
                  key={uid(i)}
                  onClick={() => setSelectedDay(formattedDay)}
                  className={`${styles.selectableItem} ${
                    selectedDay === formattedDay &&
                    styles.bookAppointment__selectedItem
                  }`}
                >
                  <span>{format(day, "EEE")}</span>
                  <span>{day.getDate()}</span>
                </div>
              );
            })}
          </div>
          <h6>Time</h6>
          <div className={styles.bookAppointment__timeSlots}>
            {bookAppointment.length > 0 ? (
              bookAppointment.slice(0, selectedLimit).map((time, i) => (
                <div
                  key={uid(i)}
                  onClick={() => setSelectedTime(time.Time)}
                  className={`${styles.selectableItem} ${
                    selectedTime === time.Time &&
                    styles.bookAppointment__selectedItem
                  }`}
                >
                  {time.Time}
                </div>
              ))
            ) : (
              <div className={styles.bookAppointment__emptyState}>
                <EmptyState />
                No slots found
              </div>
            )}
            {bookAppointment.length > 0 && (
              <div
                className={styles.loadMore}
                onClick={() => setSelectedLimit((prev) => prev + 10)}
              >
                Load more...
              </div>
            )}
          </div>
          <button
            className={`${styles.bookAppointment__submitButton} ${
              !selectedTime && styles.bookAppointment__buttonDisabled
            }`}
            onClick={() => {
              if (selectedTime) {
                if (isConsult) {
                  props.history.push({
                    pathname: "/checkout",
                    state: {
                      docId: doctorDetails?.id,
                      docWlocId: doctorDetails?.docWlocId,
                      docFees: fees,
                      date: selectedDay,
                      time: selectedTime,
                    },
                  });
                } else {
                  createAppointment();
                }
              }
            }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default SlotBookAppointment;
