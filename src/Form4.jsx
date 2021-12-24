import { useState } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { CustomButton } from "./components/CustomButton";
import styles from "./sass/SignUp.module.scss";

const Form4 = ({ form, setForm, incrementStep }) => {
  const [error, setError] = useState("");

  const validate = () => {
    setError(!form?.txtGender ? "Please select a gender" : "");

    incrementStep();
  };

  return (
    <form className={styles.signUp__form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.signUp__form4RadioGroup}>
        <div
          onClick={() => setForm({ ...form, txtGender: "male" })}
          className={`${
            form.txtGender === "male" ? styles.signUp__radioSelected : ""
          }`}
        >
          <label>Male</label>
          <BsGenderMale />
        </div>
        <div
          onClick={() => setForm({ ...form, txtGender: "female" })}
          className={`${
            form.txtGender === "female" ? styles.signUp__radioSelected : ""
          }`}
        >
          <label>Female</label>
          <BsGenderFemale />
        </div>
      </div>
      {error && (
        <span className={`error-text ${styles.errorSpan}`}>{error}</span>
      )}
      <CustomButton text="Next" onClick={validate} />
    </form>
  );
};

export default Form4;
