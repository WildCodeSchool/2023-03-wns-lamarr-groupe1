import React from "react";
import BasicPriceCard from "../components/common/BasicPriceCard";
import ExpertPriceCard from "../components/common/ExpertPriceCard";
import purpleWave from "../assets/images/Vector 256.png";
import { useNavigate } from "react-router-dom";
import "../styles/PricingPage.scss";

const PricingPage = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/home");
  };

  return (
    <div className="container-pricing-page">
      <div className="container-pricing-cards">
        {/* <button onClick={handleClickBack}>backhome</button> */}
        <BasicPriceCard />
        <ExpertPriceCard />
      </div>
      {/* <img className="purpleWave" src={purpleWave} alt="purple" /> */}
    </div>
  );
};

export default PricingPage;
