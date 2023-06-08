import React from "react";
const FormSignIn = () => {
  return (
    <div>
      <div className="container-card-form">
        <h2>CONNECTEZ-VOUS</h2>
        <p className="details-text">
          Bonjour ! renseigner vos coordonnées pour vous connecter
        </p>
        <form action="">
          <input type="email" name="email" id="email" placeholder="Email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
          />
          <button className="button-form-signIn">Se connecter</button>
        </form>

        <p className="signup-details">
          Pas encore de déjà un compte?<span>Inscrivez-vous !</span>
        </p>
      </div>
    </div>
  );
};

export default FormSignIn;
