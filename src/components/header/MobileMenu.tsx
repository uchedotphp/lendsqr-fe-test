import Button from "@components/ui/buttons/Button";
import MenuIcon from "@assets/icons/menu-icon.svg";

const MobileMenu = () => {
  return (
    <Button className="btn--flat h-full w-full">
      <img src={MenuIcon} alt="menu icon" />
    </Button>
  );
};

export default MobileMenu;
