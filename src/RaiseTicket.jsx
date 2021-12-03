import { useState } from "react";
import styles from "./sass/RaiseTicket.module.scss";

function RaiseTicket() {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    issue: "",
  });

  const handleError = (e) => {
    if (!e.target.value) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: `Please enter your ${e.target.name}`,
      }));
    } else if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  return (
    <div className={`page-safeareas ${styles.raiseTicket__main}`}>
      <div className={styles.raiseTicket__imageContainer}>
        <img src="/contact.png" alt="support" />
      </div>
      <h3 className="page-header">Open a new ticket</h3>
      <form>
        <div className={styles.raiseTicket__inputContainer}>
          <label>Name</label>
          <input name="name" placeholder="Your name" onBlur={handleError} />
          {errors.name && (
            <span className={styles.raiseTicket__error}>{errors.name}</span>
          )}
        </div>
        <div className={styles.raiseTicket__inputContainer}>
          <label>Email Address</label>
          <input name="email" placeholder="Your email" onBlur={handleError} />
          {errors.email && (
            <span className={styles.raiseTicket__error}>{errors.email}</span>
          )}
        </div>
        <div className={styles.raiseTicket__inputContainer}>
          <label>Mobile Number</label>
          <input
            name="number"
            placeholder="Your 10-digit number"
            type="number"
            maxLength="10"
            onBlur={handleError}
          />
          {errors.number && (
            <span className={styles.raiseTicket__error}>{errors.number}</span>
          )}
        </div>
        <div className={styles.raiseTicket__inputContainer}>
          <label>Issue</label>
          <textarea name="issue" onBlur={handleError} />
          {errors.issue && (
            <span className={styles.raiseTicket__error}>{errors.issue}</span>
          )}
        </div>
        <div className={styles.raiseTicket__buttonContainer}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RaiseTicket;
