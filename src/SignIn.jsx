/* eslint-disable eqeqeq */
import styles from "./sass/SignIn.module.scss";
import IconInput from "./components/IconInput";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsPersonFill,
} from "react-icons/bs";
import { useState } from "react";
import { CustomButton } from "./components/CustomButton";
import { Link } from "react-router-dom";
import { fetchData } from "./Api/Apis";

const SignIn = ({ history }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [secondInp, setSecondInp] = useState("");

  const validate = () => {
    let email = "",
      pwd = "";

    if (!userEmail) {
      email = "Please enter a valid email or number";
    }
    if (
      secondInp &&
      (!password || password.length < (secondInp == 1 ? 8 : 6))
    ) {
      pwd =
        secondInp == 1
          ? "Please enter the 8 digit password"
          : "Please enter the 6 digit OTP";
    }

    setError({ email, pwd });

    if (!pwd && !email) {
      if (secondInp) {
        Login();
      } else {
        sendOtp();
      }
    }
  };

  const sendOtp = async () => {
    try {
      const res = await fetchData("chkUserLogin", "formData", {
        OrganizationID: sessionStorage.getItem("orgId"),
        OrgLocationID: sessionStorage.getItem("branchId"),
        txtUserName: userEmail,
      });
      setSecondInp(res?.setPasswordFlag);
    } catch (error) {}
  };

  const Login = async () => {
    try {
      await fetchData("confirmUserLogin", "formData", {
        OrganizationID: sessionStorage.getItem("orgId"),
        OrgLocationID: sessionStorage.getItem("branchId"),
        User_ID: sessionStorage.getItem("userId"),
        txtUserName: userEmail,
        txtPassword: password,
      });
    } catch (error) {}
  };

  return (
    <div className={`page-safeareas ${styles.signIn__main}`}>
      <div>
        <p
          className={styles.signIn__newUser}
          onClick={() => history.push("/signUp")}
        >
          New User?
        </p>
        <h1>
          <span>Hello!</span>
          <span>Sign in to your account</span>
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <IconInput
            icon={<BsPersonFill />}
            placeholder="Your email / mobile number"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            error={error?.email}
            className={styles.signIn__emailInput}
          />

          {secondInp && (
            <IconInput
              icon={
                secondInp == 1 ? (
                  showPassword ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )
                ) : undefined
              }
              iconClick={() => setShowPassword((p) => !p)}
              placeholder={
                secondInp == 1 ? "Enter your password" : "Enter the OTP"
              }
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              error={error?.pwd}
              className={styles.signIn__emailInput}
              type={
                secondInp == 1 ? (showPassword ? "text" : "password") : "text"
              }
            />
          )}
          <div className={styles.signIn__buttonContainer}>
            <CustomButton text="Submit" onClick={validate} />
          </div>
        </form>
      </div>
      <img src="/footer.png" alt="footer-blob" />
    </div>
  );
};

export default SignIn;
