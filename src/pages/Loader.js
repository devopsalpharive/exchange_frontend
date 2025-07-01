import React from "react";
import Lottie from "lottie-react";
import loader from "../asset/json/screenloader.json";

const Loader = () => {
  return (
    <div className="screen_loader d-flex align-items-center justify-content-center">
      <Lottie animationData={loader} className="site_loader" loop={true} />
    </div>
  );
};

export default Loader;
