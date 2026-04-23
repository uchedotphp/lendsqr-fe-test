import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import { getUserById } from "@/app/_lib/server/users-repository";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await simulateLatency(250);
  const { id } = await params;
  const user = getUserById(id);

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  return Response.json({ user });
}
