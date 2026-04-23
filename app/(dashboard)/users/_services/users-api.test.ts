import { describe, expect, it, vi } from "vitest";
import { apiClient } from "@/app/_lib/api/client";
import {
  fetchUserById,
  fetchUserDetailsById,
  fetchUsers,
  fetchUsersKpis,
  updateUserActivationStatus,
  updateUserBlacklistStatus,
} from "@/app/(dashboard)/users/_services/users-api";

vi.mock("@/app/_lib/api/client", () => ({
  apiClient: {
    get: vi.fn(),
    patch: vi.fn(),
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
        organizations: ["Bank A", "Bank B"],
        pagination: {
          page: 1,
          rows: 10,
          total: 2,
        },
      },
    });

    const users = await fetchUsers();

    expect(users.users).toHaveLength(1);
    expect(users.users[0]).toMatchObject({
      id: "123",
      username: "jane",
      email: "jane@example.com",
      guarantor: { fullName: "Jane Doe" },
    });
  });

  it("passes filters and pagination params", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        users: [],
        organizations: ["Bank A", "Bank B"],
        pagination: {
          page: 2,
          rows: 25,
          total: 0,
        },
      },
    });

    await fetchUsers(
      {
        organization: "Bank A",
        status: "active",
      },
      {
        page: 2,
        rows: 25,
      },
    );

    expect(apiClient.get).toHaveBeenCalledWith("/users", {
      params: {
        organization: "Bank A",
        status: "active",
        page: 2,
        rows: 25,
      },
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

describe("fetchUserDetailsById", () => {
  it("returns a user details payload for upper details view", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        userDetails: {
          id: "usr-001",
          status: "active",
          fullName: "Grace Effiom",
          userCode: "LSQF12345690",
          tier: 2,
          accountBalance: "N200,000.00",
          accountNumber: "9912345678",
          bankName: "Providus Bank",
        },
      },
    });

    const userDetails = await fetchUserDetailsById("usr-001");

    expect(userDetails).toMatchObject({
      id: "usr-001",
      fullName: "Grace Effiom",
      tier: 2,
    });
    expect(apiClient.get).toHaveBeenCalledWith("/users/usr-001/details");
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

describe("updateUserBlacklistStatus", () => {
  it("calls blacklist endpoint and returns updated user", async () => {
    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      data: {
        user: { id: "usr-001", status: "blacklisted" },
      },
    });

    const user = await updateUserBlacklistStatus("usr-001", true);

    expect(apiClient.patch).toHaveBeenCalledWith("/users/usr-001/blacklist", {
      blacklisted: true,
    });
    expect(user).toMatchObject({ id: "usr-001", status: "blacklisted" });
  });
});

describe("updateUserActivationStatus", () => {
  it("calls activation endpoint and returns updated user", async () => {
    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      data: {
        user: { id: "usr-001", status: "active" },
      },
    });

    const user = await updateUserActivationStatus("usr-001", true);

    expect(apiClient.patch).toHaveBeenCalledWith("/users/usr-001/activate", {
      active: true,
    });
    expect(user).toMatchObject({ id: "usr-001", status: "active" });
  });
});
