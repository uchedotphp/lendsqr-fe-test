import { NextResponse } from "next/server";
import { credentialsMatch } from "@/app/_lib/server/auth-credentials";
import {
  AUTH_SESSION_COOKIE,
  AUTH_SESSION_COOKIE_OPTIONS,
  buildAuthSessionValue,
} from "@/app/_lib/server/auth-session";
import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import { loginSchema } from "@/app/(auth)/_services/auth-schema";

export async function POST(request: Request) {
  await simulateLatency(400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { message: "Validation failed", errors: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  if (!credentialsMatch(email, password)) {
    return Response.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    success: true,
    email,
    name: "Uchechukwu Nwulu",
    role: "admin",
  });
  response.cookies.set(
    AUTH_SESSION_COOKIE,
    buildAuthSessionValue(),
    AUTH_SESSION_COOKIE_OPTIONS,
  );

  return response;
}
