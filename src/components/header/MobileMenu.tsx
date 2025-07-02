import Button from "@components/ui/buttons/Button";
import MenuIcon from "@assets/icons/menu-icon.svg";
import SidebarContext from "../../state-management/context/SidebarContext";
import { useContext } from "react";

const MobileMenu = () => {
  const sidebar = useContext(SidebarContext);

  return (
    <Button className="btn--flat h-full w-full" onClick={sidebar.toggleSidebar}>
      <img src={MenuIcon} alt="menu icon" />
    </Button>
  );
};

export default MobileMenu;
