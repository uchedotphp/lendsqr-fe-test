"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/app/_components/button/button";
import { BodyText } from "@/app/_components/typography/body-text";
import { routes } from "@/app/_lib/constants/routes";
import { useLoginForm } from "@/app/(auth)/_hooks/use-login-form";
import styles from "@/app/(auth)/styles/login-form.module.scss";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, submitLogin } = useLoginForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form className={styles["login-form"]} onSubmit={submitLogin}>
      <label className={styles["login-form__field"]} htmlFor="email">
        <BodyText
          as="span"
          size="sm"
          className={styles["login-form__label-sr"]}
          tone="muted"
        >
          Email
        </BodyText>
        <input
          id="email"
          className={styles["login-form__input"]}
          type="email"
          autoComplete="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email ? (
          <BodyText
            as="span"
            size="sm"
            tone="error"
            className={styles["login-form__error"]}
          >
            {errors.email.message}
          </BodyText>
        ) : null}
      </label>

      <label className={styles["login-form__field"]} htmlFor="password">
        <BodyText
          as="span"
          size="sm"
          className={styles["login-form__label-sr"]}
          tone="muted"
        >
          Password
        </BodyText>
        <div className={styles["login-form__password-wrap"]}>
          <input
            id="password"
            className={styles["login-form__input"]}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            {...register("password")}
          />
          <Button
            variant="ghost"
            className={styles["login-form__password-toggle"]}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </Button>
        </div>
        {errors.password ? (
          <BodyText
            as="span"
            size="sm"
            tone="error"
            className={styles["login-form__error"]}
          >
            {errors.password.message}
          </BodyText>
        ) : null}
      </label>

      <Link
        href={routes.forgotPassword}
        className={styles["login-form__forgot-password"]}
        aria-label="Reset your password"
      >
        FORGOT PASSWORD?
      </Link>

      <Button variant="primary" fullWidth type="submit" disabled={isSubmitting}>
        {isSubmitting ? "SIGNING IN..." : "LOG IN"}
      </Button>
    </form>
  );
}
