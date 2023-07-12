import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_QUERY } from "graphql/queries/SIGN_IN_QUERY";
import { useLazyQuery } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";

interface IuserSignIn {
  email: string;
  password: string;
}

const FormSignIn = () => {
  const [credantials, setCredantials] = useState(false);
  const navigate = useNavigate();
  const [userSignIn, { loading }] = useLazyQuery(SIGN_IN_QUERY);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserSignIn>();
  const onSubmit: SubmitHandler<IuserSignIn> = async (data) => {
    try {
      const result = await userSignIn({
        variables: data,
      });
      const token = result.data.signIn;
      localStorage.setItem("token", token);
      setCredantials(false);
      navigate("/");
    } catch (error) {
      setCredantials(true);
    }
  };

  return (
    <div className="container-card-form">
      <h2>Connectez-vous</h2>
      <p className="details-text">
        Bonjour ! Renseigner vos coordonnées pour vous connecter
      </p>
      {credantials ? (
        <div className="error">
          <p>l'email ou le mot de passe n'est pas valide</p>
        </div>
      ) : null}

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          id="email"
          placeholder="Email*"
          {...register("email", {
            required: "Ce champ est requis !",
            // pattern: {
            //   value: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/,
            //   message: "Veuillez inclure un '@' dans votre adress email",
            // },
          })}
        />
        {errors.email ? (
          <p className="error-input"> {errors.email.message}</p>
        ) : null}
        <input
          type="password"
          id="password"
          placeholder="Mot de passe*"
          {...register("password", {
            required: "Ce champ est requis !",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
              message:
                "Le mot de passe doit contenir une lettres majuscules et minuscules, un chiffres et un caractères spécial",
            },
          })}
        />
        {errors.password ? (
          <p className="error-input"> {errors.password.message}</p>
        ) : null}
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
