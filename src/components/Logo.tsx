import LendsqrLogo from "@assets/icons/lendsqr-logo.svg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="h-full w-full">
      <img src={LendsqrLogo} alt="Lendsqr logo" />
    </Link>
  );
};

export default Logo;
