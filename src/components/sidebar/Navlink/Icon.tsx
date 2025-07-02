import DecisonModels from "@assets/icons/decision-models.svg";
import FeesAndCharges from "@assets/icons/fees-and-charges.svg";
import FeesAndPricing from "@assets/icons/fees-and-pricing.svg";
import Guarantors from "@assets/icons/guarantors.svg";
import Karma from "@assets/icons/karma.svg";
import LoanRequest from "@assets/icons/loan-request.svg";
import Loans from "@assets/icons/loans.svg";
import Organization from "@assets/icons/organization.svg";
import Reports from "@assets/icons/reports.svg";
import SavingsProducts from "@assets/icons/savings-products.svg";
import Savings from "@assets/icons/savings.svg";
import ServiceAccount from "@assets/icons/service-account.svg";
import Services from "@assets/icons/services.svg";
import Settlements from "@assets/icons/settlements.svg";
import Transactions from "@assets/icons/transactions.svg";
import Users from "@assets/icons/users.svg";
import Whitelist from "@assets/icons/whitelist.svg";
import Preferences from "@assets/icons/preferences.svg";
import HomeIcon from "@assets/icons/homeIcon.svg";
import AuditLogs from "@assets/icons/audit-logs.svg";

const icons = {
  "audit-logs": AuditLogs,
  "decision-models": DecisonModels,
  "fees-and-charges": FeesAndCharges,
  "fees-and-pricing": FeesAndPricing,
  guarantors: Guarantors,
  karma: Karma,
  "loan-requests": LoanRequest,
  "loan-products": LoanRequest,
  loans: Loans,
  organization: Organization,
  reports: Reports,
  "savings-products": SavingsProducts,
  savings: Savings,
  "service-account": ServiceAccount,
  services: Services,
  settlements: Settlements,
  transactions: Transactions,
  users: Users,
  whitelist: Whitelist,
  preferences: Preferences,
  home: HomeIcon,
};

export type IconKeys = keyof typeof icons;

interface IconProps {
  menuIcon: IconKeys;
  slug: string;
  className?: string;
}

const Icon = ({ menuIcon, slug, className }: IconProps) => {
  const iconSrc = icons[menuIcon];
  return <img src={iconSrc} alt={slug} className={className} />;
};

export default Icon;
