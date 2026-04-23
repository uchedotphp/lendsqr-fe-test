import { writeFile } from "node:fs/promises";
import path from "node:path";
import usersDb from "@/app/_lib/server/data/users-db.json";
import type { User, UserDetails } from "@/app/_lib/types/user";

export type UsersKpi = {
  label: string;
  value: number;
};

type RawUsersDb = {
  usersKpis: Array<{
    label?: unknown;
    value?: unknown;
  }>;
  usersRecords: RawUserRecord[];
};

type RawUserRecord = {
  id?: unknown;
  email?: unknown;
  status?: unknown;
  username?: unknown;
  createdAt?: unknown;
  phoneNumber?: unknown;
  organizations?: unknown;
  accountSummary?: {
    accountNumber?: unknown;
    accountName?: unknown;
    bankName?: unknown;
    balance?: unknown;
  };
  generalDetails?: {
    personalInformation?: {
      bvn?: unknown;
      gender?: unknown;
      children?: unknown;
      maritalStatus?: unknown;
      typeOfResidence?: unknown;
      fullName?: unknown;
    };
    educationAndEmployment?: {
      officeEmail?: unknown;
      loanRepayment?: unknown;
      monthlyIncome?: unknown;
      employmentStatus?: unknown;
      levelOfEducation?: unknown;
      sectorOfEmployment?: unknown;
      durationOfEmployment?: unknown;
    };
    socials?: {
      twitter?: unknown;
      facebook?: unknown;
      instagram?: unknown;
    };
    guarantor?: Array<{
      fullName?: unknown;
      phoneNumber?: unknown;
      emailAddress?: unknown;
      relationship?: unknown;
    }>;
  };
  activeOrganization?: unknown;
};

const db = usersDb as RawUsersDb;
const usersDbFilePath = path.join(
  process.cwd(),
  "app/_lib/server/data/users-db.json",
);

function toSafeString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toUserStatus(value: unknown): User["status"] {
  if (
    value === "active" ||
    value === "inactive" ||
    value === "pending" ||
    value === "blacklisted"
  ) {
    return value;
  }

  return "inactive";
}

function parseMonthlyIncomeRange(value: unknown): [string, string] {
  const raw = toSafeString(value);
  const ranges = raw.match(/\d[\d,]*\.?\d*/g) ?? [];
  const normalized = ranges.map((part) => part.replaceAll(",", ""));

  if (normalized.length >= 2) {
    return [normalized[0], normalized[1]];
  }

  if (normalized.length === 1) {
    return [normalized[0], normalized[0]];
  }

  return ["0.00", "0.00"];
}

function getUserTier(status: User["status"]): UserDetails["tier"] {
  if (status === "active") {
    return 2;
  }

  if (status === "pending") {
    return 1;
  }

  return 1;
}

function getUserCode(record: RawUserRecord): string {
  const accountNumber = toSafeString(record.accountSummary?.accountNumber);
  const accountSuffix = accountNumber.slice(-6);

  if (accountSuffix.length > 0) {
    return `LSQF${accountSuffix}90`;
  }

  const idSuffix = toSafeString(record.id).slice(-8).toUpperCase();
  return idSuffix.length > 0 ? `LSQF${idSuffix}` : "LSQF000000";
}

function mapRecordToUser(record: RawUserRecord): User {
  const personalInformation = record.generalDetails?.personalInformation;
  const educationAndEmployment = record.generalDetails?.educationAndEmployment;
  const socials = record.generalDetails?.socials;
  const primaryGuarantor = record.generalDetails?.guarantor?.[0];
  const organizations = Array.isArray(record.organizations)
    ? record.organizations
    : [];

  const activeOrganization = toSafeString(record.activeOrganization);
  const organizationFromList =
    typeof organizations[0] === "string" ? organizations[0] : "Unknown";

  return {
    id: toSafeString(record.id),
    accountNumber: toSafeString(record.accountSummary?.accountNumber, "N/A"),
    organization: activeOrganization || organizationFromList,
    username: toSafeString(record.username),
    email: toSafeString(record.email),
    phoneNumber: toSafeString(record.phoneNumber),
    dateJoined: toSafeString(record.createdAt),
    status: toUserStatus(record.status),
    bvn: toSafeString(personalInformation?.bvn),
    gender: toSafeString(personalInformation?.gender),
    maritalStatus: toSafeString(personalInformation?.maritalStatus),
    children: toSafeString(personalInformation?.children),
    residenceType: toSafeString(personalInformation?.typeOfResidence),
    educationLevel: toSafeString(educationAndEmployment?.levelOfEducation),
    employmentStatus: toSafeString(educationAndEmployment?.employmentStatus),
    sector: toSafeString(educationAndEmployment?.sectorOfEmployment),
    duration: toSafeString(educationAndEmployment?.durationOfEmployment),
    officeEmail: toSafeString(educationAndEmployment?.officeEmail),
    monthlyIncome: parseMonthlyIncomeRange(
      educationAndEmployment?.monthlyIncome,
    ),
    loanRepayment: toSafeString(educationAndEmployment?.loanRepayment),
    twitter: toSafeString(socials?.twitter),
    facebook: toSafeString(socials?.facebook),
    instagram: toSafeString(socials?.instagram),
    guarantor: {
      fullName: toSafeString(primaryGuarantor?.fullName),
      phoneNumber: toSafeString(primaryGuarantor?.phoneNumber),
      email: toSafeString(primaryGuarantor?.emailAddress),
      relationship: toSafeString(primaryGuarantor?.relationship),
    },
    guarantors:
      record.generalDetails?.guarantor?.map((item) => ({
        fullName: toSafeString(item.fullName),
        phoneNumber: toSafeString(item.phoneNumber),
        email: toSafeString(item.emailAddress),
        relationship: toSafeString(item.relationship),
      })) ?? [],
  };
}

export function getUsers(): User[] {
  return db.usersRecords.map(mapRecordToUser);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((user) => user.id === id);
}

export function getUserDetailsById(id: string): UserDetails | undefined {
  const record = db.usersRecords.find((item) => toSafeString(item.id) === id);
  if (!record) {
    return undefined;
  }

  const fullName =
    toSafeString(record.generalDetails?.personalInformation?.fullName) ||
    toSafeString(record.accountSummary?.accountName) ||
    "Unnamed User";

  const normalizedStatus = toUserStatus(record.status);

  return {
    id,
    status: normalizedStatus,
    fullName,
    userCode: getUserCode(record),
    tier: getUserTier(normalizedStatus),
    accountBalance: toSafeString(record.accountSummary?.balance, "N0.00"),
    accountNumber: toSafeString(record.accountSummary?.accountNumber),
    bankName: toSafeString(record.accountSummary?.bankName),
  };
}

export function getUsersKpis(): UsersKpi[] {
  return db.usersKpis
    .map((item) => ({
      label: toSafeString(item.label).trim(),
      value:
        typeof item.value === "number"
          ? item.value
          : Number.parseInt(toSafeString(item.value), 10),
    }))
    .filter((item) => item.label.length > 0 && Number.isFinite(item.value));
}

async function persistDb() {
  await writeFile(usersDbFilePath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
}

export async function updateUserBlacklistStatus(
  id: string,
  blacklisted: boolean,
): Promise<User | undefined> {
  const target = db.usersRecords.find(
    (record) => toSafeString(record.id) === id,
  );
  if (!target) {
    return undefined;
  }

  target.status = blacklisted ? "blacklisted" : "inactive";
  await persistDb();
  return mapRecordToUser(target);
}

export async function updateUserActivationStatus(
  id: string,
  active: boolean,
): Promise<User | undefined> {
  const target = db.usersRecords.find(
    (record) => toSafeString(record.id) === id,
  );
  if (!target) {
    return undefined;
  }

  target.status = active ? "active" : "inactive";
  await persistDb();
  return mapRecordToUser(target);
}
