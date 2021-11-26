import React from "react";
import { useEffect, useState } from "react";
import styles from "./sass/AppNew.module.scss";
import { fetchData } from "./Api/Apis";
import axios from "axios";

const PaymentConsultation = (props) => {
  const [PaymentFees, setPaymentFees] = useState([]);

  useEffect(() => {
    getPaymentConsultation();
  }, []);

  async function getPaymentConsultation() {
    try {
      const resp = await fetchData("getOrgDoctorFees");
      setPaymentFees(resp);
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

    // const result = await axios.post("http://localhost:5000/payment/orders");

    // if (!result) {
    //   alert("Server error. Are you online?");
    //   return;
    // }

    // const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_live_uBMmGDcdbiVtL9", // Enter the Key ID generated from the Dashboard
      amount: "500",
      currency: "INR",
      name: "S10 safecare",
      description: "Test Transaction",
      image: "{ logo }",
      // order_id: "1111",
      handler: async (response) => {
        const data = {
          orderCreationId: "1111",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:4000/payment/success",
          data
        );

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
    <div>
      <div className={styles.Consultation_Backoption}>
        <h2 className={styles.Consultation_OnlineConsulting}>
          Online Consulting
        </h2>
        <h4 className={styles.Consultation_Reasons}>
          {" "}
          Reasons for your consultation
        </h4>{" "}
        <input
          placeholder="  Enter reason for your consultation"
          className={styles.Consultation_InputReason}
        />
      </div>
      <strong className={styles.Consultation_Paymentsummary}>
        Payment Summary
      </strong>{" "}
      <div className={styles.tableborder} style={styles.PNR}>
        <table className={styles.Consultation_Tables}>
          <thead>
            <tr>
              <th className={styles.thtable}>#</th>
              <th className={styles.thtable}>Description</th>
              <th className={styles.thtable}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tabletd}>1</td>
              <td className={styles.tabletd}>Consultation Fee</td>
              <td className={styles.tabletd}>
                INR {PaymentFees[0]?.fee} (USD {PaymentFees[0]?.fee})
              </td>
            </tr>
            <tr>
              <td></td>
              <td className={styles.tabletd}>Total</td>
              <td className={styles.tabletd}>
                INR {PaymentFees[0]?.fee} (USD {PaymentFees[0]?.fee})
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.applypromobutton}>
          <input className={styles.inputpromo} placeholder="  Promo Code" />
          <button className={styles.Applybutton}>Apply</button>
        </div>
        <br></br>
      </div>
      <div style={{ margin: "30px" }}>
        <p className={styles.selectpayment}>Select payment type</p>
        <div className={styles.inputradiobtn}>
          <div className={styles.InputRadio}>
            <input
              type="radio"
              className={styles.Consultation_RadioButtons}
              id="00"
            />

            <span className={styles.ruzarpay}>
              Pay with Razorpay(INR)-Only In India
            </span>
          </div>
          <br></br>
          <div className={styles.InputRadio}>
            <input
              type="radio"
              className={styles.Consultation_RadioButtons}
              id="01"
            />

            <span className={styles.paypal}>
              {" "}
              Pay with PayPal(USD)-Other than India
            </span>
          </div>
        </div>
        <div className={styles.paymentdiv}>
          <button className={styles.Payment} onClick={displayRazorpay}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaymentConsultation;
