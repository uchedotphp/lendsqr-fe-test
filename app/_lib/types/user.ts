export type User = {
  id: string;
  accountNumber: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
  educationLevel: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: [string, string];
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  guarantors?: Array<{
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  }>;
};

export type UserDetails = {
  id: string;
  status: User["status"];
  fullName: string;
  userCode: string;
  tier: 1 | 2 | 3;
  accountBalance: string;
  accountNumber: string;
  bankName: string;
};
