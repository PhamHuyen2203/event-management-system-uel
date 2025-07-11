import React from "react";
import "./Footer.css";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaTiktok } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import logoSchoolWhite from "../assets/logo-school-white.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Information Section */}
        <div className="footer-section">
          <h3 className="footer-title">INFORMATION</h3>
          <ul className="footer-links">
            <li>
              <a
                href="https://uel.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
              >
                UEL Website
              </a>
            </li>
            <li>
              <a
                href="https://myuel.uel.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
              >
                UEL MyUEL
              </a>
            </li>
            <li>
              <a
                href="https://library.uel.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
              >
                UEL Library
              </a>
            </li>
            <li>
              <a
                href="https://elearning.uel.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
              >
                UEL E-Learning
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-title">CONTACT</h3>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">
                <IoHomeOutline />
              </span>
              <div className="contact-text">
                <strong>Address:</strong> 669 Đỗ Mười, Khu phố 6, Phường Linh
                Xuân, TP. Thủ Đức, TP. Hồ Chí Minh.
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">
                <MdOutlinePhoneInTalk />
              </span>
              <div className="contact-text">
                <strong>Call us:</strong> 028 37244539
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">
                <MdOutlineEmail />
              </span>
              <div className="contact-text">
                <strong>E-mail:</strong> cntt@uel.edu.vn
              </div>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="footer-section">
          <h3 className="footer-title">MEDIA</h3>
          <div className="social-media">
            <a
              href="https://facebook.com/uel.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="social-icon">
                <FaFacebookSquare />
              </span>
            </a>
            <a
              href="https://instagram.com/uel.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="social-icon">
                <FaInstagram />
              </span>
            </a>
            <a
              href="https://tiktok.com/@uel.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="social-icon">
                <FaTiktok />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Central Logo Section */}
      <div className="footer-logo-section">
        <div className="footer-logo-container">
          <img src={logoSchoolWhite} alt="UEL Logo" className="footer-logo" />
          <div className="footer-brand-text">
            <p className="footer-brand-subtitle">EVENT MANAGEMENT SYSTEM</p>
            <p className="footer-brand-subtitle">
              FOR STUDENTS UNIVERSITY OF ECONOMICS AND LAW
            </p>
            <p className="footer-brand-subtitle">
              - VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
