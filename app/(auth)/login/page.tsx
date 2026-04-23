import type { Metadata } from "next";
import Image from "next/image";
import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { LoginForm } from "@/app/(auth)/_components/login-form";
import styles from "@/app/(auth)/styles/login-page.module.scss";

export const metadata: Metadata = {
  title: "Lendsqr | Login",
  description: "Sign in to access your Lendsqr dashboard.",
};

export default function LoginPage() {
  return (
    <main className={styles["auth-page"]}>
      <section className={styles["auth-page__showcase"]}>
        <div className={styles["auth-page__brand"]}>
          <Image
            src="/lendsqr-logo.svg"
            alt="Lendsqr logo"
            width={174}
            height={36}
            priority
            className={styles["auth-page__brand-logo"]}
          />
        </div>
        <div className={styles["auth-page__illustration"]}>
          <Image
            src="/auth-image.png"
            alt="Lendsqr login illustration"
            width={620}
            height={338}
            priority
          />
        </div>
      </section>

      <section className={styles["auth-page__panel"]}>
        <div className={styles["auth-page__content"]}>
          <div className={styles["auth-page__mobile-brand"]}>
            <Image
              src="/lendsqr-logo.svg"
              alt="Lendsqr logo"
              width={174}
              height={36}
              priority
              className={styles["auth-page__brand-logo"]}
            />
          </div>
          <div className={styles["auth-page__intro"]}>
            <HeadingText
              level="h1"
              size="2xl"
              className={styles["auth-page__title"]}
            >
              Welcome!
            </HeadingText>
            <BodyText className={styles["auth-page__subtitle"]} tone="muted">
              Enter details to login.
            </BodyText>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
