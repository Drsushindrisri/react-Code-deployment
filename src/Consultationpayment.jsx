import React from "react";
import { useEffect, useState } from "react";
import styles from "./sass/AppNew.module.scss";
import { fetchData } from "./Api/Apis";

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
          <button className={styles.Payment}>Make Payment</button>
        </div>
      </div>
    </div>
  );
};
export default PaymentConsultation;
