import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ExpertPriceCard = () => {
  const navigate = useNavigate();

  const handleChangeSignUp = () => {
    navigate("/sign-up?type=expert");
  };
  return (
    <div className="container-expert-price-card">
      <div className="container-part-1-expert">
        <h3>EXPERT</h3>
        <div className="container-price">
          <p className="price-card">9,99</p>
          <p className="euro">€</p>
          <p>/ mois</p>
        </div>
        <button onClick={handleChangeSignUp} className="button-card-expert">
          PROFITER DE L'OFFRE
        </button>
      </div>
      <div className="container-part-2-expert">
        <div className="executions-code">
          <FontAwesomeIcon icon={faCheck} />
          <p>50 executions de code par jour</p>
        </div>
        <div className="executions-code">
          <FontAwesomeIcon icon={faCheck} />
          <p>50 executions de code par jour</p>
        </div>
        <div className="executions-code">
          <FontAwesomeIcon icon={faCheck} />
          <p>50 executions de code par jour</p>
        </div>
      </div>
    </div>
  );
};

export default ExpertPriceCard;
