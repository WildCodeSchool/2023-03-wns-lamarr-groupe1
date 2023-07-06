import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ExpertPriceCard = () => {
  return (
    <div className="container-expert-price-card">
      <div className="container-part-1-expert">
        <h3>EXPERT</h3>
        <div className="container-price">
          <p className="price-card">9,99</p>
          <p className="euro">€</p>
          <p>/ mois</p>
        </div>
        <button className="button-card">ACHETER</button>
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
