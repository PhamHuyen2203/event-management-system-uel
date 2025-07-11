import logoUEL from "../assets/logo UEL.png";
import "./Logo.css";

const Logo = ({ size = "medium", variant = "blue" }) => {
  const sizeClasses = {
    small: "logo-small",
    medium: "logo-medium",
    large: "logo-large",
  };

  const variantClasses = {
    blue: "logo-blue",
    white: "logo-white",
  };

  return (
    <div className={`logo ${sizeClasses[size]}`}>
      <img src={logoUEL} alt="UEL Logo" className="logo-image" />
    </div>
  );
};

export default Logo;
