import { createContext, useState, type ReactNode } from "react";

interface DashboardContextProps {
  refreshData: () => void;
  lastUpdated: Date;
}

const DashboardContext = createContext<DashboardContextProps>({
  refreshData: () => {},
  lastUpdated: new Date(),
} as DashboardContextProps);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshData = () => {
    setLastUpdated(new Date());
  };

  return (
    <DashboardContext.Provider
      value={{
        refreshData,
        lastUpdated,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
