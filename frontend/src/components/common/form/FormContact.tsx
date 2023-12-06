import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "../../../styles/components/FormContact.scss";
import { CONTACT_MUTATION } from "graphql/mutations/CONTACT_MUTATION";
import { useMutation } from "@apollo/client";
import { extractValidationsErrors } from "utils/extractValidationsErrors";

interface IContactForm {
  title: string;
  name: string;
  email: string;
  content: string;
}

const ContactForm = () => {
  const navigate = useNavigate();
  const [IContact, { loading }] = useMutation(CONTACT_MUTATION);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IContactForm>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<IContactForm> = async (data) => {
    const input = {
      title: data.title,
      name: data.name,
      email: data.email,
      content: data.content,
    };

    try {
      const result = await IContact({
        variables: {
          input: {
            title: data.title,
            name: data.name,
            email: data.email,
            content: data.content,
          },
        },

        onError: (error) => {
          const validationErrors: Record<string, string[]> =
            extractValidationsErrors(error.graphQLErrors);
          for (const fieldKey of Object.keys(validationErrors)) {
            for (const message of validationErrors[fieldKey]) {
              const testError = setError(fieldKey as keyof IContactForm, {
                type: "manual",
                message: message,
              });
              console.log(testError);
            }
          }
        },
      });
      console.log(result);
      navigate("/");
    } catch (error: any) {}
  };

  return (
    <div className="page-contact">
      <div className="contact-container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label>Contactez-nous</label>
          <input
            type="text"
            id="name"
            placeholder="Nom*"
            {...register("name", {
              required: "Un nom est requis !",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <input
            type="email"
            id="email"
            placeholder="Email*"
            {...register("email", {
              required: "Ce champ est requis !",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message:
                  "Le mot de passe doit contenir une lettres majuscules et minuscules, un chiffres et un caractères spécial",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />

          <input
            type="text"
            id="titre"
            placeholder="titre"
            {...register("title", {
              required: "Un nom est requis !",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
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
                value: 10,
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
