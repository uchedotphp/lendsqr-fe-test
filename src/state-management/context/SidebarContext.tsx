import { createContext, useState, type ReactNode } from "react";

interface SidebarContextProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps>({
  sidebarOpen: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
