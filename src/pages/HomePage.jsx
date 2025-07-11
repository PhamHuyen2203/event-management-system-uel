import { useNavigate } from "react-router-dom";
import bannerHomepage from "../assets/banner-homepage.png";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero image section */}
      <div className="hero-section">
        <div className="hero-image">
          {/* Banner homepage */}
          <div className="banner-homepage">
            <img src={bannerHomepage} alt="Banner" />
          </div>
        </div>
      </div>

      {/* Title and login section */}
      <div className="content-section">
        <h1 className="main-title">
          <span className="event">E</span>VENT{" "}
          <span className="management">M</span>ANAGEMENT{" "}
          <span className="system">S</span>YSTEM
        </h1>

        <h2 className="subtitle">EVENT MANAGEMENT SYSTEM FOR STUDENTS</h2>

        <p className="university-name">
          UNIVERSITY OF ECONOMICS AND LAW - VIETNAM NATIONAL UNIVERSITY, HO CHI
          MINH CITY
        </p>

        <div className="login-section">
          <button className="login-button" onClick={() => navigate("/login")}>
            LOG IN
          </button>

          <div className="register-section">
            <p className="register-text">You don't have an EMS account?</p>
            <a
              href="#"
              className="register-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
