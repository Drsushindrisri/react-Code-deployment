import { CustomButton } from "./components/CustomButton";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import { fetchData } from "./Api/Apis";
import styles from "./sass/SignUp.module.scss";
import { useState } from "react";

const Form5 = ({ form, setForm, incrementStep }) => {
  const [error, setError] = useState("");

  const userEmailCheck = async () => {
    try {
      fetchData("chkUserSignup", "formData", {
        ...form,
        dob: `${form.dob.day}/${form.dob.month}/${form.dob.year}`,
      });
    } catch (error) {}
  };

  const validate = () => {
    setError(form.dob ? "" : "Please enter a valid date of birth");

    if (form.dob) {
      userEmailCheck();
    }
  };

  return (
    <form className={styles.signUp__form} onSubmit={(e) => e.preventDefault()}>
      <DatePicker
        value={form.dob}
        onChange={(v) => setForm({ ...form, dob: v })}
        inputPlaceholder="Date of birth"
        wrapperClassName="signUp__form5__datePicker"
        shouldHighlightWeekends
        minimumDate={utils().getToday()}
      />
      {error && (
        <span className={`error-text ${styles.errorSpan}`}>{error}</span>
      )}
      <CustomButton text="Next" onClick={validate} />
    </form>
  );
};

export default Form5;
