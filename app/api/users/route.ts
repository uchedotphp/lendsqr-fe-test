import { simulateLatency } from "@/app/_lib/server/simulate-latency";
import {
  getUsers,
  type UsersFilters,
  type UsersPagination,
} from "@/app/_lib/server/users-repository";

function toPositiveInt(value: string | null, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function toStatus(value: string | null): UsersFilters["status"] | undefined {
  if (
    value === "active" ||
    value === "inactive" ||
    value === "pending" ||
    value === "blacklisted"
  ) {
    return value;
  }

  return undefined;
}

export async function GET(request: Request) {
  await simulateLatency(300);
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const filters: UsersFilters = {
    organization: searchParams.get("organization") ?? undefined,
    username: searchParams.get("username") ?? undefined,
    email: searchParams.get("email") ?? undefined,
    date: searchParams.get("date") ?? undefined,
    phoneNumber: searchParams.get("phoneNumber") ?? undefined,
    status: toStatus(searchParams.get("status")),
  };

  const pagination: UsersPagination = {
    page: toPositiveInt(searchParams.get("page"), 1),
    rows: toPositiveInt(searchParams.get("rows"), 10),
  };

  const result = getUsers(filters, pagination);

  return Response.json({
    users: result.users,
    organizations: result.organizations,
    pagination: {
      page: pagination.page,
      rows: pagination.rows,
      total: result.total,
    },
  });
}
