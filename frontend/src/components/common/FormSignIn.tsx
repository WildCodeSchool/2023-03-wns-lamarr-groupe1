import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGN_IN_QUERY } from "../../graphql/queries/SIGN_IN_QUERY";
const FormSignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  console.log(form);

  return (
    <div className="container-card-form">
      <h2>CONNECTEZ-VOUS</h2>
      <p className="details-text">
        Bonjour ! Renseigner vos coordonnées pour vous connecter
      </p>
      <form action="">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => {
            setForm({
              ...form,
              email: e.target.value,
            });
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) => {
            setForm({
              ...form,
              password: e.target.value,
            });
          }}
        />
        <button type="submit" className="button-form-signIn">
          Se connecter
        </button>
      </form>

      <p className="signup-details">
        Pas encore de compte ? <Link to={"/sign-up"}>Inscrivez-vous !</Link>
      </p>
    </div>
  );
};

export default FormSignIn;
