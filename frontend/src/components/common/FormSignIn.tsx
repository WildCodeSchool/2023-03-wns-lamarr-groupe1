import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_QUERY } from "../../graphql/queries/SIGN_IN_QUERY";
import { useLazyQuery } from "@apollo/client";

interface IuserSignIn {
  email: string;
  password: string;
}
const FormSignIn = () => {
  const navigate = useNavigate();

  const [credantials, setCredantials] = useState(false);
  // state user
  const [form, setForm] = useState<IuserSignIn>({
    email: "",
    password: "",
  });
  const [userSignIn, { loading }] = useLazyQuery(SIGN_IN_QUERY);
  console.log(form);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // ajout firstname, email, password... à la query SIGN_IN_QUERY
      const result = await userSignIn({
        variables: form,
      });
      //récupère et stock le token dans le localStorage
      const token = result.data.signIn;
      localStorage.setItem("token", token);
      setCredantials(false);
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setCredantials(true);
    }
  };
  return (
    <div className="container-card-form">
      <h2>CONNECTEZ-VOUS</h2>
      <p className="details-text">
        Bonjour ! Renseigner vos coordonnées pour vous connecter
      </p>
      {credantials ? (
        <div className="error">
          <p>l'email ou le mot de passe n'est pas valide</p>
        </div>
      ) : null}

      <form action="" onSubmit={handleSubmit}>
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
      <span>- OR -</span>

      <div className="content-sso-signin">
        <button className="sso-google">Connection avec Google</button>
        <button className="sso-facebook">Connection avec Facebook</button>
      </div>
      <p className="signup-details">
        Pas encore de compte ? <Link to={"/sign-up"}>Inscrivez-vous !</Link>
      </p>
    </div>
  );
};

export default FormSignIn;
