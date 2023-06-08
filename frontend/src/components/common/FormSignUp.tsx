import { Link } from "react-router-dom";
import { useState } from "react";
// import { SIGN_UP_MUTATION } from "../../graphql/mutations/SIGN_UP_MUTATION";
const FormSignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  console.log(form);

  return (
    <div className="container-card-form">
      <h2>Inscrivez-vous</h2>
      <p className="details-text">
        Bonjour ! Renseigner vos coordonnées pour vous inscrire
      </p>
      <form action="">
        <div className="container-input-firstName-lastName">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={(e) => {
              setForm({
                ...form,
                firstName: e.target.value,
              });
            }}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={(e) => {
              setForm({
                ...form,
                lastName: e.target.value,
              });
            }}
          />
        </div>
        <input
          type="text"
          name="pseudo"
          id="pseudo"
          placeholder="Pseudo"
          value={form.username}
          onChange={(e) => {
            setForm({
              ...form,
              username: e.target.value,
            });
          }}
        />
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
        <button className="button-form-signIn">S'inscrire</button>
      </form>

      <p className="signup-details">
        déjà un compte ? <Link to={"/sign-in"}>Connectez-vous !</Link>
      </p>
    </div>
  );
};

export default FormSignUp;
