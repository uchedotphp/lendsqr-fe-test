import { NextResponse } from "next/server";
import {
  AUTH_SESSION_COOKIE,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/app/_lib/server/auth-session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_SESSION_COOKIE, "", {
    ...AUTH_SESSION_COOKIE_OPTIONS,
    maxAge: 0,
  });
  return response;
}
