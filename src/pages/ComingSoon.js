import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const ComingSoon = () => {
  return (
    <div>
      <Header />
      <section className="custom_section">
        <div className="container container80">
          <div className="coming_soon custom_section d-flex align-items-center justify-content-center">
            <h3>Coming Soon</h3>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ComingSoon;
