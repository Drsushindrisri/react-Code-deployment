import styles from "./sass/SignUp.module.scss";
import { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";

const headers = [
  <h1>Create your account</h1>,
  <h1>Secure your account</h1>,
  <p>
    <span>Welcome to S10.fit</span>
    <span>Let's personalise your experience</span>
  </p>,
  <h1>Choose your gender</h1>,
  <h1>Select your date of birth</h1>,
];

function SignUp(props) {
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState({
    OrganizationID: sessionStorage.getItem("orgId"),
    OrgLocationID: sessionStorage.getItem("branchId"),
    txtEmailID: "",
    txtPassword: "",
    txtFirstName: "",
    txtLastName: "",
    txtMobileNumber: "",
    txtOTP: "",
    txtGender: "",
  });

  const incrementStep = () => setActiveStep((p) => p + 1);
  const decrementStep = () => setActiveStep((p) => p - 1);

  return (
    <div className={`page-safeareas page-padding-top ${styles.signUp__main}`}>
      <div>
        <div>
          <div className={styles.signUp__singaLogo}>
            <img src="/singa.png" alt="singa" />
          </div>
          {headers[activeStep - 1]}

          {activeStep === 1 && (
            <Form1
              form={form}
              setForm={setForm}
              incrementStep={incrementStep}
              history={props?.history}
            />
          )}
          {activeStep === 2 && (
            <Form2
              form={form}
              setForm={setForm}
              incrementStep={incrementStep}
              decrementStep={decrementStep}
            />
          )}
          {activeStep === 3 && (
            <Form3
              form={form}
              setForm={setForm}
              incrementStep={incrementStep}
              decrementStep={decrementStep}
            />
          )}
          {activeStep === 4 && (
            <Form4
              form={form}
              setForm={setForm}
              incrementStep={incrementStep}
              decrementStep={decrementStep}
            />
          )}
          {activeStep === 5 && (
            <Form5
              form={form}
              setForm={setForm}
              incrementStep={incrementStep}
              decrementStep={decrementStep}
            />
          )}
        </div>
      </div>
      <img src="/footer.png" alt="footer-blob" />
    </div>
  );
}

export default SignUp;
