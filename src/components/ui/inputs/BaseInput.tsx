import styles from "./input.module.scss";
import { useController, type UseControllerProps } from "react-hook-form";
import { useState, type InputHTMLAttributes } from "react";

const BaseInput = <T extends Record<string, string>>({
  control,
  name,
  disabled,
  className,
  ...rest
}: UseControllerProps<T> &
  InputHTMLAttributes<HTMLInputElement>) => {
  const { field, fieldState } = useController({ control, name });
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // console.log("fieldState", fieldState);
  // console.log("field", field);

  return (
    <div className={styles.input__wrapper}>
      <input
        {...field}
        value={field.value ?? ""}
        {...rest}
        disabled={disabled}
        className={`${styles["input__textfield"]} ${
          isFocused ? styles["input__textfield--focus"] : ""
        } ${isHovered ? styles["input__textfield--hover"] : ""} ${
          fieldState.invalid && !isFocused
            ? styles["input__textfield--error-state"]
            : ""
        } ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {fieldState.invalid && !isFocused && (
        <span className={styles["input__textfield--error-state-text"]}>
          {fieldState.error?.message}
        </span>
      )}
    </div>
  );
};

export default BaseInput;
