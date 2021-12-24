import styles from "./CustomButton.module.scss";

export const CustomButton = ({ text, onClick, type }) => (
  <button className={styles.customButton__main} onClick={onClick} typr={type}>
    {text}
  </button>
);
