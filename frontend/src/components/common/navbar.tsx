import "./styles/navbar.scss";
import img from "../../../src/assets/img/mainLogo.svg";

export default function navbar() {
  return (
    <nav>
      <ul>
        <li>
          <img src={img} />
        </li>
        <li>
          <a href="/pricing">Pricing</a>
        </li>
        <li>
          <a href="/aboutus">About us</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <div>
        <a href="/login">Connexion</a>
        <button>
          <a href="/signin">Inscription</a>
        </button>
      </div>
    </nav>
  );
}
