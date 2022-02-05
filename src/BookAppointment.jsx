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

export const FailureSvg = () => (
  <svg
    viewBox="0 0 87 87"
    class="cross-mark"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Group-2" transform="translate(2.000000, 2.000000)">
        <circle
          id="Oval-2"
          stroke="rgba(252, 191, 191, .5)"
          stroke-width="4"
          cx="41.5"
          cy="41.5"
          r="41.5"
        ></circle>
        <circle
          class="ui-error-circle"
          stroke="#F74444"
          stroke-width="4"
          cx="41.5"
          cy="41.5"
          r="41.5"
        ></circle>
        <path
          class="ui-error-line1"
          d="M22.244224,22 L60.4279902,60.1837662"
          id="Line"
          stroke="#F74444"
          stroke-width="3"
          stroke-linecap="square"
        ></path>
        <path
          class="ui-error-line2"
          d="M60.755776,21 L23.244224,59.8443492"
          id="Line"
          stroke="#F74444"
          stroke-width="3"
          stroke-linecap="square"
        ></path>
      </g>
    </g>
  </svg>
);

const SlotBookAppointment = (props) => {
  const [bookAppointment, setBookAppointment] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [modalOpen, setModalOpen] = useState({ state: false, type: "" });
  const [patientInfo, setPatientInfo] = useState({});
  const [fees, setFees] = useState({});
  const [loading, setLoading] = useState(false);

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

  const isConsult = props?.location?.state?.type === "consult";

  async function getSlotBookAppointment() {
    setLoading(true);
    try {
      const resp = await fetchData("getDoctorsAppointmentSlots", "formData", {
        OrganizationID: doctorDetails?.fakeOrgId,
        OrgMainLocationID: doctorDetails?.docWlocId,
        appDate: selectedDay,
        DoctorID: doctorDetails.id,
        ...(isConsult && { AppointmentType: "OnlineConsulting" }),
      });
      setBookAppointment(resp?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function getDocFees() {
    try {
      const resp = await fetchData("getOrgDoctorFees", "reqBody", {
        OrganizationID: doctorDetails?.fakeOrgId,
        MainProviderID: doctorDetails?.id,
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
        organizationId: sessionStorage.getItem("orgId"),
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
        organizationId: doctorDetails?.fakeOrgId,
        USER_ID: sessionStorage.getItem("userId"),
        MainLocationId: doctorDetails?.docWlocId,
        PatientMainId: patientInfo.patient_mainid,
        PatientCode: patientInfo.pid,
        appStatusId: 1,
      });
      toggleModal("success");
    } catch (error) {
      console.log({ error, patientInfo });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(createAppointment, [selectedDay, selectedTime]);

  const toggleModal = (type) => setModalOpen({ state: !modalOpen.state, type });

  return (
    <>
      <SuccessAlert
        modalOpen={modalOpen.state}
        toggleModal={toggleModal}
        text={
          modalOpen.type === "success"
            ? "Successfully Booked"
            : "Transaction Failed"
        }
        svg={modalOpen.type === "success" ? SuccessSvg() : FailureSvg()}
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
                {selectedDay ? (
                  loading ? (
                    <span className={styles.bookAppointment__loadingWrapper}>
                      <Loader />
                    </span>
                  ) : (
                    <EmptyState />
                  )
                ) : (
                  <DatePickerSvg />
                )}
                {selectedDay
                  ? !loading
                    ? "No slots found"
                    : ""
                  : "Choose a Date"}
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
                      fakeOrgId: doctorDetails?.fakeOrgId,
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

export const Loader = () => (
  <svg
    version="1.1"
    id="L2"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 100 100"
    xmlSpace="preserve"
  >
    <circle
      fill="none"
      stroke="#ffa800"
      strokeWidth="4"
      strokeMiterlimit="10"
      cx="50"
      cy="50"
      r="48"
    />
    <line
      fill="none"
      strokeLinecap="round"
      stroke="#ffa800"
      strokeWidth="4"
      strokeMiterlimit="10"
      x1="50"
      y1="50"
      x2="85"
      y2="50.5"
    >
      <animateTransform
        attributeName="transform"
        dur="2s"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </line>
    <line
      fill="none"
      strokeLinecap="round"
      stroke="#ffa800"
      strokeWidth="4"
      strokeMiterlimit="10"
      x1="50"
      y1="50"
      x2="49.5"
      y2="74"
    >
      <animateTransform
        attributeName="transform"
        dur="15s"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </line>
  </svg>
);
