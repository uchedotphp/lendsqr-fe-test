export const DUMMY_AUTH = {
  email: "admin@lendsqr.com",
  password: "Lendsqr123",
} as const;

export function credentialsMatch(email: string, password: string): boolean {
  return (
    email.toLowerCase() === DUMMY_AUTH.email && password === DUMMY_AUTH.password
  );
}
