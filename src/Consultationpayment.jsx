import React from "react";
import { useState } from "react";
import styles from "./sass/ConsultationPayment.module.scss";
import { fetchData } from "./Api/Apis";
import { toUSD } from "./utils/toUSD";
import { dateFormat } from "./utils/dateFormat";
import { SuccessAlert } from "./SuccessAlert";

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
          INR &#8377;{price} (USD ${toUSD(price)})
        </td>
      </tr>

      <tr>
        <td></td>
        <td>
          <strong>Total</strong>
        </td>
        <td>
          <strong>
            INR &#8377;{price} (USD ${toUSD(price)})
          </strong>
        </td>
      </tr>
    </tbody>
  </table>
);

const PaymentConsultation = (props) => {
  const [paymentType, setPaymentType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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

    const result = await fetchData(
      "razorPayCreateOrder",
      "reqBody",
      {
        patientId: 927,
        providerId: 23,
        mainDoctorId: props?.location?.state?.docId,
        amount: 1,
        organizationId: 23,
      },
      "Billing"
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const patientInfo = await fetchData(
      "getPatientInfo",
      "reqBody",
      {
        patientId: 927,
        organizationId: 23,
      },
      "Billing"
    );

    const options = {
      key: "rzp_live_uBMmGDcdbiVtL9", // Enter the Key ID generated from the Dashboard
      amount: "500",
      currency: "INR",
      name: "S10 safecare",
      description: "Test Transaction",
      image: "{ logo }",
      order_id: result?.data?.razorpay_order_id || "",
      handler: async (response) => {
        const appDetails = await fetchData(
          "createAppointment",
          "reqBody",
          {
            LocationId: patientInfo?.data?.[0].practicelocat_id,
            PatientId: "927",
            ProviderId: fees?.provider_id,
            MainProviderId: fees?.mainprovider_id,
            appDate: dateFormat(props?.location?.state?.date),
            appReasonId: "17",
            duration: 30,
            sTime: props?.location?.state?.time.slice(0, 5),
            eTime: "",
            organizationId: 23,
            USER_ID: 927,
            MainLocationId: props?.location?.state?.docWlocId,
            PatientMainId: patientInfo?.data?.[0].patient_mainid,
            PatientCode: patientInfo?.data?.[0].pid,
            appStatusId: 1,
          },
          "Appointment"
        );

        await fetchData(
          "razorPayPaymentCallback",
          "reqBody",
          {
            patientId: 927,
            USER_ID: 927,
            providerId: fees?.provider_id,
            mainDoctorId: fees?.mainprovider_id,
            rawResponse: response,
            organizationId: 23,
            docWlocId: props?.location?.state?.docWlocId,
            appointmentId: appDetails?.data,
            locOrderId: result?.data?.loc_order_id,
          },
          "Billing"
        );

        setModalOpen(true);
      },
      prefill: {
        name: "S10 safecare",
        email: "info@s10health.com",
        contact: "9884507007",
      },
      notes: {
        address: "S10 Corporate Office",
      },
      theme: {
        color: "#ff8a00",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const toggleModal = () => setModalOpen((p) => !p);

  return (
    <>
      <SuccessAlert modalOpen={modalOpen} toggleModal={toggleModal} />
      <div className={`page-safeareas ${styles.consultationPayment__main}`}>
        <label htmlFor="reasonInput">
          Reason for your consultation
          <input id="reasonInput" />
        </label>
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
          <div>
            <input
              type="radio"
              name="paymentType"
              value="razorpay"
              onChange={(e) => setPaymentType(e.target.value)}
            />
            Pay using Razorpay (INR) - only in India
          </div>
          <div>
            <input
              type="radio"
              name="paymentType"
              value="paypal"
              onChange={(e) => setPaymentType(e.target.value)}
            />
            Pay using Paypal (USD) - other than India
          </div>
        </div>
        <div className={styles.consultationPayment__makePaymentContainer}>
          <button
            className={`${styles.consultationPayment__makePayment} ${
              paymentType !== "razorpay" &&
              styles.consultationPayment__makePayment_disabled
            }`}
            onClick={displayRazorpay}
          >
            Make Payment
          </button>
        </div>
      </div>
    </>
  );
};
export default PaymentConsultation;
