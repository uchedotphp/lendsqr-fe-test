import usersDb from "@/app/_lib/server/data/users-db.json";
import type { User } from "@/app/_lib/types/user";

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
  };
  generalDetails?: {
    personalInformation?: {
      bvn?: unknown;
      gender?: unknown;
      children?: unknown;
      maritalStatus?: unknown;
      typeOfResidence?: unknown;
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
  };
}

export function getUsers(): User[] {
  return db.usersRecords.map(mapRecordToUser);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((user) => user.id === id);
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
