import React from "react";
import { Images } from "../data/Images";

const FeaturesCard = (props) => {
  return (
    <>
      <div className="home__featuresCard p-3 pb-5">
        <img src={props.data.img} className="img-fluid home_featureCardImg" />
        <h6 className="m-0 home__featureCardTitle mt-4">{props.data.title}</h6>
        <p className="m-0 home__featureCardHint mt-3">{props.data.hint}</p>
      </div>
    </>
  );
};

export default FeaturesCard;
