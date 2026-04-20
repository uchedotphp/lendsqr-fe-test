export const AUTH_SESSION_COOKIE = "lendsqr-session";
const AUTH_SESSION_VALUE = "authenticated";

export const AUTH_SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 8,
};

export function buildAuthSessionValue() {
  return AUTH_SESSION_VALUE;
}

export function isValidAuthSession(sessionValue: string | undefined) {
  return sessionValue === AUTH_SESSION_VALUE;
}
