import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import { updateUserActivationStatus } from "@/app/_lib/server/users-repository";

type ActivationPayload = {
  active: boolean;
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

  const { active } = body as Partial<ActivationPayload>;
  if (typeof active !== "boolean") {
    return Response.json(
      { message: "The 'active' flag must be a boolean." },
      { status: 400 },
    );
  }

  const { id } = await params;
  const user = await updateUserActivationStatus(id, active);

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  return Response.json({ user });
}
