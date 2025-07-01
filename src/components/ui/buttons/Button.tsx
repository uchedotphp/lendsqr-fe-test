import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

const Button = ({
  onClick,
  children,
  className,
  type = "button",
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      className={`${styles["base-button"]} ${className} ${
        disabled ? styles["base-button--disabled"] : ""
      }`}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
