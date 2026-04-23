import { describe, expect, it, vi } from "vitest";
import { apiClient } from "@/app/_lib/api/client";
import {
  fetchUserById,
  fetchUsers,
  fetchUsersKpis,
} from "@/app/(dashboard)/users/_services/users-api";

vi.mock("@/app/_lib/api/client", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("fetchUsers", () => {
  it("returns users from API envelope", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        users: [
          {
            id: "123",
            accountNumber: "1000000123",
            organization: "Lendsqr",
            username: "jane",
            email: "jane@example.com",
            phoneNumber: "123",
            dateJoined: "2024-01-01T00:00:00.000Z",
            status: "active" as const,
            bvn: "90000000123",
            gender: "female",
            maritalStatus: "Single",
            children: "None",
            residenceType: "Parent's Apartment",
            educationLevel: "B.Sc",
            employmentStatus: "Employed",
            sector: "FinTech",
            duration: "2 Years",
            officeEmail: "jane@example.com",
            monthlyIncome: ["200000.00", "500000.00"],
            loanRepayment: "40000",
            twitter: "@lendsqr_user",
            facebook: "lendsqr.user",
            instagram: "@lendsqr_user",
            guarantor: {
              fullName: "Jane Doe",
              phoneNumber: "456",
              email: "jane@example.com",
              relationship: "Sibling",
            },
          },
        ],
      },
    });

    const users = await fetchUsers();

    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({
      id: "123",
      username: "jane",
      email: "jane@example.com",
      guarantor: { fullName: "Jane Doe" },
    });
  });

  it("propagates API errors", async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error("network"));

    await expect(fetchUsers()).rejects.toThrow("network");
  });
});

describe("fetchUserById", () => {
  it("returns a single user", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        user: {
          id: "usr-001",
          accountNumber: "1000000001",
          organization: "Lendsqr",
          username: "ade.bakare",
          email: "ade@example.com",
          phoneNumber: "0801",
          dateJoined: "2019-03-15T10:00:00.000Z",
          status: "active" as const,
          bvn: "90000000001",
          gender: "male",
          maritalStatus: "Married",
          children: "2",
          residenceType: "Own Apartment",
          educationLevel: "M.Sc",
          employmentStatus: "Employed",
          sector: "FinTech",
          duration: "4 Years",
          officeEmail: "ade@lendsqr.com",
          monthlyIncome: ["350000.00", "450000.00"],
          loanRepayment: "55000",
          twitter: "@ade",
          facebook: "ade",
          instagram: "@ade",
          guarantor: {
            fullName: "Chioma Bakare",
            phoneNumber: "0809",
            email: "chioma@example.com",
            relationship: "Spouse",
          },
        },
      },
    });

    const user = await fetchUserById("usr-001");

    expect(user).toMatchObject({ id: "usr-001", username: "ade.bakare" });
    expect(apiClient.get).toHaveBeenCalledWith("/users/usr-001");
  });
});

describe("fetchUsersKpis", () => {
  it("returns users kpi metrics", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        kpis: [{ label: "users", value: 156005000 }],
      },
    });

    const kpis = await fetchUsersKpis();

    expect(kpis).toEqual([{ label: "users", value: 156005000 }]);
    expect(apiClient.get).toHaveBeenCalledWith("/users/kpis");
  });
});
