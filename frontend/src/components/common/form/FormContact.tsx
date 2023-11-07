import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_QUERY } from "graphql/queries/SIGN_IN_QUERY";
import { useLazyQuery } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "../../../styles/components/FormContact.scss";

interface IContactForm {
  name: string;
  email: string;
  content: string;
}

const ContactForm = () => {
  const [credantials, setCredantials] = useState(false);
  const navigate = useNavigate();
  const [userSignIn, { loading }] = useLazyQuery(SIGN_IN_QUERY);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactForm>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<IContactForm> = async (data) => {
    try {
      const result = await userSignIn({
        variables: data,
      });
      navigate("/");
    } catch (error) {
      setCredantials(true);
    }
  };

  return (
    <div className="page-contact">
      <div className="contact-container">
        {credantials ? (
          <div className="error">
            <p>l'email n'est pas valide</p>
          </div>
        ) : null}

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label>Contactez-nous</label>
          <input
            type="name"
            id="name"
            placeholder="Nom*
          
          "
            {...register("name", {
              required: "Ce champ est requis !",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Format d'email invalide",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <input
            type="email"
            id="email"
            placeholder="Email*"
            {...register("email", {
              required: "Ce champ est requis !",
              minLength: {
                value: 3,
                message: "Le mot de passe doit contenir au moins 3 caractères",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message:
                  "Le mot de passe doit contenir une lettres majuscules et minuscules, un chiffres et un caractères spécial",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="content"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <textarea
            className="contact-content"
            rows={10}
            id="content"
            placeholder="Message*"
            {...register("content", {
              required: "Un message est obligatoire !",
              minLength: {
                value: 100,
                message:
                  "Le contenu du message doit contenir au moins 10 caractères",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="content"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <button
            type="submit"
            className="button-form-contact"
            disabled={loading}
          >
            Envoyer mon message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
