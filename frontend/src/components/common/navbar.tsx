import React from "react";
import "styles/components/navbar.scss";
import { Link } from "react-router-dom";
import img from "assets/img/mainLogo.svg";

interface NavbarProps {
  isAuthenticated: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  return (
    <>
      <nav className="main-nav">
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
        {isAuthenticated ? (
          <div>
            <span>
              <a href="/notifications">Notifications</a>
            </span>
            <span>
              <a href="/profile">Mon profil </a>
            </span>
            <div className="button-red">
              <Link to={"/Logout"}>Déconnexion</Link>
            </div>
          </div>
        ) : (
          <div>
            <span>
              <Link to="{/signup}">S'inscire</Link>
            </span>
            <div className="button">
              <Link to="{/signin}">Connexion</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="nav-burger">
        <div className="nav-burger-img">
          <img
            src={img}
            alt="main logo site web composé de cercles de couleur violets"
          />
        </div>
        <div className="nav-burger-burger" role="navigation" id="menuToggle">
          <input
            className="checkbox"
            type="checkbox"
            name="Toggle"
            id="nav-activation"
          />
          <div className="burger-lines">
            <span className="nav-burger-burger-span-1"></span>
            <span className="nav-burger-burger-span-2"></span>
            <span className="nav-burger-burger-span-3"></span>
          </div>
          {/* <ul className="nav-burger-burger-content">
            <li>
              <Link to={"/#Accueil"}>Accueil</Link>
            </li>
            <li>
              <Link to={"/#aboutUs"}>A propos de nous</Link>
            </li>
            <li>
              <Link to={"/#contact"}>Contact</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={"/notification"}>Notification</Link>
                </li>
                <li>
                  <Link to={"/profile"}>Mon profil</Link>
                </li>
                <li className="button-mobile-red">
                  <Link to="{/Logout}">Déconnexion</Link>
                </li>
              </>
            ) : (
              <>
                <span>
                  <Link to="/profile">Profile</Link>
                </span>
                <div className="button">
                  <Link to={"/sign-in"}>Connexion</Link>
                </div>
              </>
            )}
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
