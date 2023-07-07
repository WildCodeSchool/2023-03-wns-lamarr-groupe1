import React from "react";
import BasicPriceCard from "../components/common/BasicPriceCard";
import ExpertPriceCard from "../components/common/ExpertPriceCard";
import "../styles/PricingPage.scss";

const PricingPage = () => {
  return (
    <div className="container-pricing-page">
      <div className="container-pricing-cards">
        <BasicPriceCard />
        <ExpertPriceCard />
      </div>
      <div className="container-button-chosen"></div>
    </div>
  );
};

export default PricingPage;
