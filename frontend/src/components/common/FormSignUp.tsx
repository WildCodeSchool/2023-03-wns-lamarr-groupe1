import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SIGN_UP_MUTATION } from "../../graphql/mutations/SIGN_UP_MUTATION";
import { useMutation } from "@apollo/client";

interface IuserSignUp {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}
const FormSignUp = () => {
  // state user
  const [form, setForm] = useState<IuserSignUp>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [addUser, { loading }] = useMutation(SIGN_UP_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // ajout firstname, email, password... à la mutation SIGN_UP_MUTATION
      const result = await addUser({
        variables: { input: form },
      });

      //récupère et stock le token dans le localStorage
      const token = result.data.signUp;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container-card-form container-card-form-signup">
      <h2>Inscrivez-vous</h2>
      <p className="details-text">
        Bonjour ! Renseigner vos coordonnées pour vous inscrire
      </p>
      <form action="" onSubmit={handleSubmit}>
        <div className="container-input-firstName-lastName">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Prénom"
            value={form.firstname}
            onChange={(e) => {
              setForm({
                ...form,
                firstname: e.target.value,
              });
            }}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Nom"
            value={form.lastname}
            onChange={(e) => {
              setForm({
                ...form,
                lastname: e.target.value,
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
