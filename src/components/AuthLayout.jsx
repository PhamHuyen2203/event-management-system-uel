import backgroundLogin from "../assets/background-login.png";
import eventManagementSystem from "../assets/event-management-system.png";
import Logo from "./Logo";
import "./AuthLayout.css";

const AuthLayout = ({ children, onBackToHome }) => {
  return (
    <main className="auth-main-content">
      {/* Hero image section with background */}
      <div className="auth-hero-section">
        <div className="auth-hero-image">
          <img src={backgroundLogin} alt="Background" />
          <div className="auth-hero-overlay">
            <div className="auth-hero-content">
              <img
                src={eventManagementSystem}
                alt="Event Management System"
                className="auth-hero-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="auth-content-section">
        <div className="auth-logo">
          <Logo size="medium" />
        </div>

        {children}

        {onBackToHome && (
          <button className="back-button" onClick={onBackToHome}>
            ← Back to Home
          </button>
        )}
      </div>
    </main>
  );
};

export default AuthLayout;
