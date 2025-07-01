import authStyles from "./auth.module.scss";
import Button from "@components/ui/buttons/Button";
import BaseInput from "@components/ui/inputs/BaseInput";
import Logo from "@components/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LoginSchema, type LoginSchemaType } from "../../schemas/Schema";
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@components/ui/inputs/InputGroup";

const Login = () => {
  const { control, formState, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const [showPassword, toggleVisibility] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const displayPassword = (): "text" | "password" => {
    if (showPassword) return "text";
    return "password";
  };

  // validate login data against these values:
  const envEmail =
    import.meta.env && import.meta.env.VITE_LOGIN_EMAIL
      ? import.meta.env.VITE_LOGIN_EMAIL
      : "";
  const envPassword =
    import.meta.env && import.meta.env.VITE_LOGIN_PASSWORD
      ? import.meta.env.VITE_LOGIN_PASSWORD
      : "";

  const onSubmit: SubmitHandler<LoginSchemaType> = async (loginData) => {
    const result = LoginSchema.safeParse(loginData);
    if (!result.success) {
      setLoginError("Invalid email or password");
    } else {
      const { data } = result;
      if (data.email === envEmail && data.password === envPassword) {
        try {
          // TODO: add api call to login
          navigate("/dashboard", { replace: true });
        } catch {
          setLoginError(
            "Failed to fetch profile data. Please try again later."
          );
        }
      } else {
        setLoginError("Invalid email or password");
      }
    }
  };

  const onError: SubmitErrorHandler<LoginSchemaType> = (errors) =>
    console.log(errors);

  return (
    <div className={authStyles["auth__form-layout"]}>
      <span className={`${authStyles["logo-area"]} hide-desktop`}>
        <Logo />
      </span>
      <div className={authStyles["auth__form-content"]}>
        <h2 className={authStyles["auth__form-content__header"]}>Welcome!</h2>
        <p className={authStyles["auth__form-content__sub-header"]}>
          Enter details to login.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={authStyles["auth__form-content__form"]}
        >
          {loginError && (
            <div className={authStyles["auth__login-error"]}>{loginError}</div>
          )}
          <fieldset>
            <div className={authStyles.form__element}>
              <BaseInput
                control={control}
                name="email"
                disabled={false}
                className={authStyles.auth__input}
              />
            </div>
            <div className={authStyles.form__element}>
              <InputGroup
                control={control}
                name="password"
                type={displayPassword()}
                disabled={false}
                className={authStyles.auth__input}
              >
                <Button
                  type="button"
                  className={authStyles["auth__toggle-pwd-btn"]}
                  onClick={() => toggleVisibility(!showPassword)}
                >
                  {showPassword ? "hide" : "show"}
                </Button>
              </InputGroup>
            </div>
          </fieldset>

          <Link
            to="#"
            className={["text-xs", authStyles["login__forgot-password"]].join(
              " "
            )}
          >
            forgot password?
          </Link>

          <Button
            type="submit"
            disabled={!formState.isValid}
            className={["text-sm", authStyles["auth__submit-btn"]].join(" ")}
          >
            LOG IN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
