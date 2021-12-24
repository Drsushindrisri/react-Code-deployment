import { useState } from "react";
import { CustomButton } from "./components/CustomButton";
import IconInput from "./components/IconInput";
import styles from "./sass/SignUp.module.scss";

const Form3 = ({ form, setForm, incrementStep }) => {
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });

  const validate = () => {
    setErrors({
      firstName: form.txtFirstName ? "" : "Please enter your first name",
      lastName: form.txtLastName ? "" : "Please enter your last name",
    });

    if (form.txtFirstName && form.txtLastName) {
      incrementStep();
    }
  };

  return (
    <form className={styles.signUp__form} onSubmit={(e) => e.preventDefault()}>
      <IconInput
        placeholder="First Name"
        value={form.txtFirstName}
        onChange={(e) => setForm({ ...form, txtFirstName: e.target.value })}
        error={errors.firstName}
      />
      <IconInput
        placeholder="Last Name"
        value={form.txtLastName}
        onChange={(e) => setForm({ ...form, txtLastName: e.target.value })}
        error={errors.lastName}
      />
      <CustomButton text="Next" onClick={validate} />
    </form>
  );
};

export default Form3;
