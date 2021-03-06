import React from "react";
import { useState } from "react";
import styles from "./sass/ConsultationPayment.module.scss";
import { fetchData } from "./Api/Apis";
import { toUSD } from "./utils/toUSD";
import { dateFormat } from "./utils/dateFormat";
import { SuccessAlert } from "./components/SuccessAlert";
import { FailureSvg, SuccessSvg } from "./BookAppointment";

const PaymentTable = ({ price }) => (
  <table>
    <thead>
      <th>#</th>
      <th>Description</th>
      <th>Amount</th>
    </thead>
    <tbody>
      <tr>
        <td>1.</td>
        <td>Consultation Fee</td>
        <td>
          INR &#8377;{price} (USD ${toUSD(price)?.toFixed(2)})
        </td>
      </tr>

      <tr>
        <td></td>
        <td>
          <strong>Total</strong>
        </td>
        <td>
          <strong>
            INR &#8377;{price} (USD ${toUSD(price)?.toFixed(2)})
          </strong>
        </td>
      </tr>
    </tbody>
  </table>
);

const PaymentConsultation = (props) => {
  const [paymentType, setPaymentType] = useState("");
  const [modalOpen, setModalOpen] = useState({ state: false, type: "" });
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({
    reason: "",
    paymentMode: "",
  });

  const fees = props?.location?.state?.docFees;

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await fetchData("razorPayCreateOrder", "reqBody", {
      patientId: sessionStorage.getItem("userId"),
      providerId: fees?.provider_id,
      mainDoctorId: props?.location?.state?.docId,
      amount: fees?.fee,
      organizationId: sessionStorage.getItem("orgId"),
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const patientInfo = await fetchData("getPatientInfo", "reqBody", {
      patientId: sessionStorage.getItem("userId"),
      organizationId: sessionStorage.getItem("orgId"),
    });

    const options = {
      key: "rzp_live_uBMmGDcdbiVtL9", // Enter the Key ID generated from the Dashboard
      amount: result?.amount,
      currency: "INR",
      name: "S10 safecare",
      description: "Transaction",
      image: "{ logo }",
      order_id: result?.data?.razorpay_order_id || "",
      handler: async (response) => {
        const appDetails = await fetchData("createAppointment", "reqBody", {
          LocationId: patientInfo?.data?.[0].practicelocat_id,
          PatientId: sessionStorage.getItem("userId"),
          ProviderId: fees?.provider_id,
          MainProviderId: fees?.mainprovider_id,
          appDate: dateFormat(props?.location?.state?.date),
          appReasonId: "16",
          duration: 30,
          sTime: props?.location?.state?.time.slice(0, 5),
          eTime: "",
          organizationId: props?.location?.state?.fakeOrgId,
          USER_ID: sessionStorage.getItem("userId"),
          MainLocationId: props?.location?.state?.docWlocId,
          PatientMainId: patientInfo?.data?.[0].patient_mainid,
          PatientCode: patientInfo?.data?.[0].pid,
          appStatusId: 1,
        });

        try {
          await fetchData("razorPayPaymentCallback", "reqBody", {
            patientId: sessionStorage.getItem("userId"),
            USER_ID: sessionStorage.getItem("userId"),
            providerId: fees?.provider_id,
            mainDoctorId: fees?.mainprovider_id,
            rawResponse: response,
            organizationId: sessionStorage.getItem("orgId"),
            docWlocId: props?.location?.state?.docWlocId,
            appointmentId: appDetails?.data,
            locOrderId: result?.data?.loc_order_id,
            docPracticeId: props?.location?.state?.fakeOrgId,
          });
          setModalOpen({ state: true, type: "success" });
        } catch (error) {
          setModalOpen({ state: true, type: "error" });
        }
      },
      prefill: {
        name: patientInfo?.data?.[0]?.patient_name,
        email: patientInfo?.data?.[0]?.email,
        contact: patientInfo?.data?.[0]?.mobile,
      },

      theme: {
        color: "#ff8a00",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const toggleModal = () => setModalOpen({ state: !modalOpen.state, type: "" });

  const handleSubmit = () => {
    let reasonErr = "";
    let paymentModeErr = "";

    if (reason.length < 10) {
      reasonErr =
        "Please enter a vaild reason which contains a min of 10 characters";
    }

    if (!paymentType) {
      paymentModeErr = "Please choose a payment mode";
    }

    if (paymentType === "paypal") {
      paymentModeErr = "Paypal is not available. Kindly opt to Razorpay";
    }

    setErrors({
      reason: reasonErr,
      paymentMode: paymentModeErr,
    });
    if (!reasonErr && !paymentModeErr) {
      displayRazorpay();
    }
  };

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
      <div className={`page-safeareas ${styles.consultationPayment__main}`}>
        <label htmlFor="reasonInput">
          Reason for your consultation
          <input
            id="reasonInput"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        {errors.reason && <span className="error-text">{errors.reason}</span>}
        <div className="ruler-horizontal" />
        <h6>Payment Summary</h6>
        <PaymentTable price={fees?.fee || 0} />
        <label
          htmlFor="promoInput"
          className={styles.consultationPayment__promoContainer}
        >
          Have a promo code?
          <div>
            <input id="promoInput" />
            <button>Apply</button>
          </div>
        </label>
        <div className="ruler-horizontal" />
        <h6>Payment Type</h6>
        <div className={styles.consultationPayment__radioGroup}>
          <div
            className={`${
              paymentType === "razorpay" &&
              styles.consultationPayment__radioSelected
            }`}
          >
            <input
              type="radio"
              name="paymentType"
              value="razorpay"
              onChange={(e) => setPaymentType(e.target.value)}
            />
            <p>Pay using Razorpay (INR) - only in India</p>
          </div>
          <div
            className={`${
              paymentType === "paypal" &&
              styles.consultationPayment__radioSelected
            }`}
          >
            <input
              type="radio"
              name="paymentType"
              value="paypal"
              onChange={(e) => setPaymentType(e.target.value)}
            />
            <p>Pay using Paypal (USD) - other than India</p>
          </div>
          {errors.paymentMode && (
            <span className="error-text">{errors.paymentMode}</span>
          )}
        </div>
        <div className={styles.consultationPayment__makePaymentContainer}>
          <button
            className={styles.consultationPayment__makePayment}
            onClick={handleSubmit}
          >
            Make Payment
          </button>
        </div>
      </div>
    </>
  );
};
export default PaymentConsultation;
