import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import { getUsersKpis } from "@/app/_lib/server/users-repository";

export async function GET() {
  await simulateLatency(200);
  return Response.json({ kpis: getUsersKpis() });
}
