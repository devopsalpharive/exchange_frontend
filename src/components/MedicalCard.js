import React from "react";

const MedicalCard = (props) => {
  return (
    <>
      <div className="home__medicalCard ">
        <h6 className="m-0 home__featureCardTitle home__medicalCardTitle ">
          {props.data.heading}
        </h6>
        <p className="m-0 home__featureCardHint medical_desc mt-2">
          {props.data.description}
        </p>
        <img
          src={props.data.image}
          className="mt-3 mt-xxl-4 img-fluid medicalCardImg"
        />
      </div>
    </>
  );
};

export default MedicalCard;
