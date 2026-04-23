import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import { updateUserBlacklistStatus } from "@/app/_lib/server/users-repository";

type BlacklistPayload = {
  blacklisted: boolean;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await simulateLatency(180);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const { blacklisted } = body as Partial<BlacklistPayload>;
  if (typeof blacklisted !== "boolean") {
    return Response.json(
      { message: "The 'blacklisted' flag must be a boolean." },
      { status: 400 },
    );
  }

  const { id } = await params;
  const user = await updateUserBlacklistStatus(id, blacklisted);

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  return Response.json({ user });
}
