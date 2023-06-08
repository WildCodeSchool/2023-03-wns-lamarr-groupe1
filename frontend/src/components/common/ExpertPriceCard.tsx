import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ExpertPriceCard = () => {
  return (
    <div className="container-expert-price-card">
      <div className="container-part-1">
        <h3>EXPERT</h3>
        <div className="container-price">
          <p>9,99</p>
          <p>€</p>
          <p>/mois</p>
        </div>
        <p>ACHETER</p>
      </div>
      <div className="container-part-2">
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
