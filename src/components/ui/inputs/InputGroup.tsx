import { useController, type UseControllerProps } from "react-hook-form";
import { useState, type InputHTMLAttributes } from "react";
import styles from "./input.module.scss";
import type { LoginSchemaType } from "../../../schemas/Schema";

const InputGroup = ({
  control,
  name,
  type = "text",
  disabled,
  className,
  children,
  ...rest
}: UseControllerProps<LoginSchemaType> &
  InputHTMLAttributes<HTMLInputElement>) => {
  const { field, fieldState } = useController({ control, name });
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.input__wrapper}>
      <div
        className={`${styles.input__group} ${
          isFocused ? styles["input__group--focus"] : ""
        } ${isHovered ? styles["input__group--hover"] : ""} ${
          fieldState.invalid && !isFocused
            ? styles["input__group--error-state"]
            : ""
        } ${className}`}
      >
        <input
          type={type}
          {...field}
          value={field.value ?? ""}
          {...rest}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <span className={styles["input__group__children"]}>{children}</span>
      </div>

      {fieldState.invalid && !isFocused && (
        <span className={styles["input__group--error-state-text"]}>
          {fieldState.error?.message}
        </span>
      )}
    </div>
  );
};

export default InputGroup;
