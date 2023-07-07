import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SIGN_UP_MUTATION } from "../../graphql/mutations/SIGN_UP_MUTATION";
import { useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { extractValidationsErrors } from "../../utils/extractValidationsErrors";

interface IuserSignUp {
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
}
const FormSignUp = () => {
  const navigate = useNavigate();
  const [addUser, { loading }] = useMutation(SIGN_UP_MUTATION);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IuserSignUp>();
  console.log(errors.password?.message);
  const onSubmit: SubmitHandler<IuserSignUp> = async (data) => {
    try {
      const result = await addUser({
        variables: { input: data },
        onError: (error) => {
          const validationErrors: Record<string, string[]> =
            extractValidationsErrors(error.graphQLErrors);
          console.log("validationErrors", validationErrors);

          /*
            const validationErrors = { email: ['Email déjà utilisé'], password: ['Mot de passe trop court'], firstName: ['Prénom requis'], lastName: ['Nom requis'] }
          */

          for (const fieldKey of Object.keys(validationErrors)) {
            console.log(fieldKey); // chaîne de caractères (email, password, firstName, lastName)
            // Pour accéder à la valeur de la clé, on fait validationErrors[fieldKey]

            // email: ['Email déjà utilisé', 'Email invalide', 'Email requis', 'Email trop long', 'Email trop court']
            for (const message of validationErrors[fieldKey]) {
              // setError("username", {
              //   type: "manual",
              //   message: "Dont Forget Your Username Should Be Cool!",
              // })

              const testError = setError(fieldKey as keyof IuserSignUp, {
                type: "manual",
                message: message,
              });
              console.log(testError);
            }
            // errors[fieldKey] -> liste des erreurs pour le champ `email`
            // Option 1) Pour chaque clé, on utilise la fonction `setError` de react-hook-form
            // Option 2) Crée un state juste pour les erreurs GraphQL, et afficher les erreurs dans le formulaire
          }
          // 1. On boucle sur les clés de `errors`.
          // La clé de `errors` est le nom du champ du formulaire
          // La valeur de `errors` est un tableau de string, qui contient les messages d'erreurs

          // for (const constraintKey of Object.keys(errorMessage.constraints)) {

          // 2. Pour chaque clé, on utilise la fonction `setError` de react-hook-form

          // graphQLErrors[0], chercher dans `extensions.exception.validationErrors.constraints` (map sur toutes les clés)

          // 1. Vérifier s'il y a une erreur de validation (dans graphQLErrors[0])
          // 2. Si oui, récupérer les messages d'erreurs, on faisant un map sur toutes les clés de `extensions.exception.validationErrors.constraints`
          // 3. Afficher les messages d'erreurs dans le formulaire
        },
      });

      const token = result.data.signUp;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error: any) {}
  };
  return (
    <div className="container-card-form container-card-form-signup">
      <h2>Inscrivez-vous</h2>
      <p className="details-text">
        Bonjour ! Renseigner vos coordonnées pour vous inscrire
      </p>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-input-firstName-lastName">
          <input
            type="text"
            id="firstName"
            placeholder="Prénom"
            {...register("firstname")}
          />
          <input
            type="text"
            id="lastName"
            placeholder="Nom"
            {...register("lastname")}
          />
        </div>
        <input
          type="text"
          id="pseudo"
          placeholder="Pseudo*"
          {...register("username", {
            required: "Ce champ est requis !",
            minLength: 1,
          })}
        />
        {errors.username ? (
          <p className="error-input"> {errors.username.message}</p>
        ) : null}
        <input
          type="email"
          id="email"
          placeholder="Email*"
          {...register("email", { required: "Ce champ est requis !" })}
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
        <button className="button-form-signIn">S'inscrire</button>
      </form>

      <p className="signup-details">
        déjà un compte ? <Link to={"/sign-in"}>Connectez-vous !</Link>
      </p>
    </div>
  );
};

export default FormSignUp;
