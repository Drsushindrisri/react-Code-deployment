import React from "react";
import { useEffect, useState } from "react";
import styles from "./sass/ConsultationPayment.module.scss";
import { fetchData } from "./Api/Apis";
import { toUSD } from "./utils/toUSD";

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
  const [fees, setFees] = useState({});
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    getPaymentConsultation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getPaymentConsultation() {
    try {
      const resp = await fetchData("getOrgDoctorFees");
      setFees(
        resp.find((doc) => doc.mainprovider_id == props?.location?.state?.docId)
      );
    } catch (error) {}
  }

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

    const options = {
      key: "rzp_live_uBMmGDcdbiVtL9", // Enter the Key ID generated from the Dashboard
      amount: "500",
      currency: "INR",
      name: "S10 safecare",
      description: "Test Transaction",
      image: "{ logo }",
      order_id: "order_12345678",
      handler: async (response) => {
        const data = {
          orderCreationId: "order_12345678",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        // const result = await axios.post(
        //   "http://localhost:4000/payment/success",
        //   data
        // );

        alert("success");
      },
      prefill: {
        name: "Aditya V",
        email: "aditya.v@s10health.com",
        contact: "9999999999",
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

  return (
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
          className={styles.consultationPayment__makePayment}
          onClick={displayRazorpay}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};
export default PaymentConsultation;
