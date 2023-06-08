import React from "react";
import BasicPriceCard from "../components/common/BasicPriceCard";
import ExpertPriceCard from "../components/common/BasicPriceCard";
import purpleWave from "../assets/images/Vector 256.png";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/home");
  };

  return (
    <div className="container-pricing-page">
      <button onClick={handleClickBack}>backhome</button>
      <BasicPriceCard />
      <ExpertPriceCard />
      <img className="purpleWave" src={purpleWave} alt="purple" />
    </div>
  );
};

export default PricingPage;
