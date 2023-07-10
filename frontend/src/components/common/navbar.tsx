import React from "react";
import "./styles/navbar.scss";
import { Link } from "react-router-dom";
import img from "../../../src/assets/img/mainLogo.svg";

export default function navbar() {
  return (
    <nav>
      <ul>
        <li>
          <img
            src={img}
            alt="main logo site web composé de cercles de couleur violets"
          />
        </li>
        <li>
          <Link to={"/#Accueil"}>Accueil</Link>
        </li>
        <li>
          <Link to={"/#aboutUs"}>A propos de nous</Link>
        </li>
        <li>
          <Link to={"/#contact"}>Contact</Link>
        </li>
      </ul>
      <div>
        <span>
          <Link to={"/sign-up"}>S'inscrire</Link>
        </span>
        <div className="button">
          <Link to={"/sign-in"}>Connexion</Link>
        </div>
      </div>
    </nav>
  );
}
