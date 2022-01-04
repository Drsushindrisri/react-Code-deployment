import { fetchData } from "./Api/Apis";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyState } from "./svg/EmptyState";
import { DatePickerSvg } from "./svg/DatePicker";
import { uid } from "react-uid";
import { BsEmojiSmile } from "react-icons/bs";
import { getDaysInMonth } from "./utils/getDaysInMonth";
import { format } from "date-fns";
import styles from "./sass/BookAppointment.module.scss";
import "./sass/BookAppointment.scss";
import { SuccessAlert } from "./components/SuccessAlert";
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

const currentMonth = new Date().getMonth();

const twelveMonths = [
  ...months.slice(currentMonth, months.length),
  ...(currentMonth > 6 ? months.filter((_, ind) => ind + 1 < 6) : []),
];

export const SuccessSvg = () => (
  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
    <path
      class="checkmark__check"
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </svg>
);

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
    getPatientInfo();
    getDocFees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSlotBookAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  const doctorDetails = {
    name: props?.location?.state?.name,
    image: props?.location?.state?.image,
    speciality: props?.location?.state?.speciality,
    happyPatients: props?.location?.state?.happyPatients,
    id: +props?.location?.state?.id,
    docWlocId: +props?.location?.state?.docWlocId,
    fakeOrgId: +props?.location?.state?.fakeOrgId,
    profilePic: props?.location?.state?.profilePic,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => doctorDetails, [props?.location?.state]);

  async function getSlotBookAppointment() {
    try {
      const resp = await fetchData("getDoctorsAppointmentSlots", "formData", {
        OrganizationID: doctorDetails?.fakeOrgId,
        OrgMainLocationID: doctorDetails?.docWlocId,
        appDate: selectedDay,
        DoctorID: doctorDetails.id,
      });
      setBookAppointment(resp?.data);
    } catch (error) {}
  }

  async function getDocFees() {
    try {
      const resp = await fetchData("getOrgDoctorFees", "reqBody", {
        OrganizationID: sessionStorage.getItem("orgId"),
      });
      const data = (resp?.data || {}).find(
        // eslint-disable-next-line eqeqeq
        (doc) => doc.mainprovider_id == doctorDetails?.id
      );
      setFees(data === -1 ? {} : data);
    } catch (error) {}
  }

  const getPatientInfo = async () => {
    try {
      const res = await fetchData("getPatientInfo", "reqBody", {
        patientId: sessionStorage.getItem("userId"),
        OrganizationID: sessionStorage.getItem("orgId"),
      });

      setPatientInfo(res?.data?.[0]);
    } catch (error) {}
  };
  const createAppointment = async () => {
    try {
      await fetchData("createAppointment", "reqBody", {
        LocationId: patientInfo.practicelocat_id,
        PatientId: sessionStorage.getItem("userId"),
        ProviderId: fees?.provider_id,
        MainProviderId: fees?.mainprovider_id,
        appDate: dateFormat(selectedDay),
        appReasonId: "17",
        duration: 30,
        sTime: selectedTime.slice(0, 5),
        eTime: "",
        OrganizationID: 23,
        USER_ID: 927,
        MainLocationId: doctorDetails?.docWlocId,
        PatientMainId: patientInfo.patient_mainid,
        PatientCode: patientInfo.pid,
        appStatusId: 1,
      });
      toggleModal();
    } catch (error) {}
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(createAppointment, [selectedDay, selectedTime]);

  const isConsult = props?.location?.state?.type === "consult";

  const toggleModal = () => setModalOpen((p) => !p);

  return (
    <>
      <SuccessAlert
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        text="Successfully Booked"
        svg={SuccessSvg()}
      />
      <div className={styles.bookAppointment__main}>
        <div className={styles.bookAppointment__doctorDetails}>
          <img src={doctorDetails.profilePic} alt="doctor" />
          <h3>{doctorDetails?.name}</h3>
          <p>{doctorDetails?.speciality}</p>
          <div className={styles.bookAppointment__doctorInfos}>
            <BsEmojiSmile />
            <div>
              <span>{doctorDetails.happyPatients}</span>
              <span>happy patients</span>
            </div>
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
              {twelveMonths.map((month, i) => (
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
                {selectedDay ? <EmptyState /> : <DatePickerSvg />}
                {selectedDay ? "No slots found" : "Choose a Date"}
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
