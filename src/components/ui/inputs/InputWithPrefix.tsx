import type { ReactNode } from "react";

import styles from "./input.module.scss";

interface InputWithPrefixProps {
  placeholder: string;
  children: ReactNode;
  name: string;
  type: string;
  id?: string;
  className?: string;
}

const InputWithPrefix = ({
  placeholder,
  children,
  name,
  type = "text",
  id,
  className
}: InputWithPrefixProps) => {
  return (
    <div className={`${styles.input__wrapper} ${className}`}>
      <div className={styles.input__group}>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={styles.input__group__input}
        />
        <div className={styles.input__group__prefix}>{children}</div>
      </div>
    </div>
  );
};

export default InputWithPrefix;
