// src/component/footer/Footer.jsx
import React from "react";
import "./style.css";

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <span className="footerCopyright">
          © {new Date().getFullYear()} IntelliBridge. All rights reserved.
        </span>
        <ul className="footerLinks">
          <li><a href="/" className="footerLink">Home</a></li>
          <li><a href="#careers" className="footerLink">Careers</a></li>
          <li><a href="#about" className="footerLink">About Us</a></li>
          <li><a href="#contact" className="footerLink">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
