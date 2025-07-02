import NotificationIcon from "@assets/icons/notification.svg";
import EyeIcon from "@assets/icons/eye-icon.svg";
import ActivateUserIcon from "@assets/icons/activate-user.svg";

export interface QuickAction {
    id: number;
    title: string;
    description: string;
    icon: string;
    count?: number;
    action: () => void;
}

export const getQuickActions = (quickStats: { pendingApplications: number; usersToActivate: number }) => [
    {
        id: 1,
        title: "Review Applications",
        description: "Check pending loan applications",
        icon: EyeIcon,
        count: quickStats.pendingApplications,
        action: () => console.log("Review applications"),
    },
    {
        id: 2,
        title: "Activate Users",
        description: "Approve new user registrations",
        icon: ActivateUserIcon,
        count: quickStats.usersToActivate,
        action: () => console.log("Activate users"),
    },
    {
        id: 3,
        title: "Generate Reports",
        description: "Create monthly performance reports",
        icon: NotificationIcon,
        action: () => console.log("Generate reports"),
    },
]; 