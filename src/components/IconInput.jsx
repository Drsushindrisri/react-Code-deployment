import { useState } from "react";
import styles from "./IconInput.module.scss";

const IconInput = ({
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  icon,
  iconClick,
  error,
  disabled,
  className,
}) => {
  const [highlight, setHighlight] = useState(false);

  return (
    <div className={className}>
      <div
        className={`${styles.iconInput__main} ${
          highlight ? styles.iconInput__highlight : ""
        } ${disabled && styles.iconInput__disabled}`}
      >
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => {
            setHighlight(false);
            if (onBlur) {
              onBlur();
            }
          }}
          onClick={() => setHighlight(true)}
          type={type}
          disabled={disabled}
        />
        {icon && <span onClick={iconClick}>{icon}</span>}
      </div>
      {error && (
        <span className={`error-text ${styles.errorSpan}`}>{error}</span>
      )}
    </div>
  );
};

export default IconInput;
