// Footer.js
import React from "react";


function Footer() {
  return (
    <footer id="expensio-footer" className="bg-dark text-white py-4">
      <div className="container text-center">
        <h2 className="heading1 mb-3">EXPENSIO</h2>
        <p className="footerPara mb-4">
          Expensio helps you control spending, track expenses and set budget with an intuitive financial dashboard
        </p>

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          <a href="#" className="list2 text-white text-decoration-none">Home</a>
          <a href="#" className="list2 text-white text-decoration-none">Services</a>
          <a href="#" className="list2 text-white text-decoration-none">About Us</a>
          <a href="#" className="list2 text-white text-decoration-none">Contact Us</a>
        </div>

        <hr style={{ borderTop: "2px solid white" }} />

        <p className="mt-3">
          Use of this website constitutes acceptance of the site{" "}
          <a href="#" className="text-primary text-decoration-underline">Terms of Service</a>
        </p>
        <p className="mb-0">&#169; 2025 Expensio – All rights reserved</p>
      </div>
    </footer>
  );
}


export default Footer;
