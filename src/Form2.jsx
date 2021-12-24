import React, { useState } from "react";
import { BsPhone } from "react-icons/bs";
import { fetchData } from "./Api/Apis";
import { CustomButton } from "./components/CustomButton";
import IconInput from "./components/IconInput";
import { toast } from "react-toastify";
import styles from "./sass/SignUp.module.scss";
import { toastProps } from "./utils/toastProps";

const Form2 = ({ form, setForm, incrementStep }) => {
  const [error, setError] = useState({});
  const [enableOtp, setEnableOtp] = useState(false);
  const [otpReference, setOtpReference] = useState("");

  const validate = () => {
    let number = "",
      otp = "";
    if (!form.txtMobileNumber || form.txtMobileNumber.length < 10) {
      number = "Please enter a valid mobile number";
    }
    if (enableOtp && (!form.txtOTP || form.txtOTP.length < 6)) {
      otp = "Please enter the six digit OTP";
    }

    setError({ number, otp });

    if (!number && !otp) {
      if (enableOtp) {
        verifyOtp();
      } else {
        sendNumber();
      }
    }
  };

  const sendNumber = async () => {
    try {
      const toastId = toast.loading("Processing");
      const res = await fetchData("chkUserSignup", "formData", {
        ...form,
      });
      toast.update(toastId, {
        render: "OTP sent to your number",
        type: "info",
        isLoading: false,
        ...toastProps,
      });
      if (res?.OTPReference) {
        setOtpReference(res?.OTPReference);
      }
      setEnableOtp(true);
    } catch (error) {}
  };

  const verifyOtp = async () => {
    try {
      const toastId = toast.loading("Verifying OTP");
      const res = await fetchData("signupOTPVerification", "formData", {
        ...form,
        OTPReference: otpReference,
      });

      if (res?.status === "success") {
        toast.update(toastId, {
          render: "OTP verified 👌",
          type: "success",
          isLoading: false,
          ...toastProps,
        });
        incrementStep();
      } else {
        toast.update(toastId, {
          render: "Incorrect OTP 🤯",
          type: "error",
          isLoading: false,
          ...toastProps,
        });
      }
    } catch (error) {}
  };

  return (
    <form className={styles.signUp__form} onSubmit={(e) => e.preventDefault()}>
      <IconInput
        icon={<BsPhone />}
        placeholder="Enter your phone number"
        value={form.txtMobileNumber}
        onChange={({ target: { value } }) =>
          value.length < 11 ? setForm({ ...form, txtMobileNumber: value }) : ""
        }
        error={error.number}
      />

      <IconInput
        placeholder="Enter OTP"
        value={form.txtOTP}
        onChange={({ target: { value } }) =>
          value.length < 7 ? setForm({ ...form, txtOTP: value }) : ""
        }
        disabled={!enableOtp}
        error={error.otp}
      />

      <CustomButton text={enableOtp ? "Next" : "Get OTP"} onClick={validate} />

      {enableOtp && (
        <p className={styles.signUp__resendOtp}>
          Didn't receive OTP? <button onClick={sendNumber}>Resend</button>
        </p>
      )}
    </form>
  );
};

export default Form2;
