import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import { getUserDetailsById } from "@/app/_lib/server/users-repository";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await simulateLatency(220);
  const { id } = await params;
  const userDetails = getUserDetailsById(id);

  if (!userDetails) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  return Response.json({ userDetails });
}
