import { useState } from "react";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsPersonFill,
} from "react-icons/bs";
import { CustomButton } from "./components/CustomButton";
import IconInput from "./components/IconInput";
import styles from "./sass/SignUp.module.scss";

const pwdRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

export const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

const Form1 = ({ form, setForm, incrementStep, history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let email = "";
    let password = "";
    const boo = pwdRegex.test(form.txtPassword);
    if (!boo) {
      password = `Password should contain:
      1. Minimum eight characters,
      2. At least one uppercase letter,
      3. One lowercase letter,
      4. One number,
      5. One special character`;
    }

    if (!emailRegex.test(form.txtEmailID)) {
      email = "Please enter a vaild email";
    }

    setErrors({
      email,
      password,
    });

    if (!email && !password) {
      incrementStep();
    }
  };

  return (
    <form className={styles.signUp__form} onSubmit={(e) => e.preventDefault()}>
      <IconInput
        icon={<BsPersonFill />}
        placeholder="Enter your email address"
        value={form.txtEmailID}
        onChange={(e) => setForm({ ...form, txtEmailID: e.target.value })}
        error={errors.email}
      />
      <IconInput
        icon={showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
        iconClick={() => setShowPassword((p) => !p)}
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        value={form.txtPassword}
        onChange={(e) => setForm({ ...form, txtPassword: e.target.value })}
        error={errors.password}
      />
      <p className={styles.signUp__haveAcc}>
        Already have an account?{" "}
        <button onClick={() => history.push("/signIn")}>Sign in</button>
      </p>

      <CustomButton text="Next" onClick={validate} />
    </form>
  );
};

export default Form1;
