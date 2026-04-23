import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import { getUsers } from "@/app/_lib/server/users-repository";

export async function GET() {
  await simulateLatency(300);
  return Response.json({ users: getUsers() });
}
