import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ContactFormSchema = z.object({
  email: z.string().email({ message: "El email es invalido" }),
  fullname: z.string().min(5, { message: "El nombre es invalido" }),
  phone: z.string().min(5, { message: "El numero es invalido" }),
  message: z.string().min(10, { message: "El mensaje es invalido" }),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;

function ShowError({ error }: { error: string }) {
  return <p className="mt-2 text-red-500">{error}</p>;
}

export const ContactForm = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormType> = async (fields) => {
    try {
      const response = await fetch("/api/send", {
        body: JSON.stringify(fields),
        method: "POST",
      });
      const data = await response.json();
      setHasError(false);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        window.location.href = "/";
        reset();
      }, 3000);
    } catch (error) {
      setHasError(true);
      setShowMessage(true);
    }
  };

  return (
    <form
      className="w-full grid gap-6 md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {showMessage && (
        <div
          className={`${
            hasError ? "bg-red-100" : "bg-green-100"
          } col-span-2 p-4 rounded-md`}
        >
          {hasError ? (
            <p className="text-red-500">Error al enviar la consulta</p>
          ) : (
            <p className="text-green-500">
              La consulta fue enviada correctamente. Te responderemos a la
              brevedad
            </p>
          )}
        </div>
      )}

      <div className="col-span-2 md:col-span-1">
        <label
          htmlFor="website"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Nombre y Apellido
        </label>
        <input
          type="text"
          {...register("fullname", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe"
          required
        />
        {errors.fullname && <ShowError error={errors.fullname.message!} />}
      </div>

      <div className="col-span-2 md:col-span-1">
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="tuemail@gmail.com"
          required
        />
        {errors.email && <ShowError error={errors.email.message!} />}
      </div>

      <div className="col-span-2">
        <label
          htmlFor="phone"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Numero de teléfono
        </label>
        <input
          type="number"
          {...register("phone", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tu numero de teléfono"
          required
        />
        {errors.phone && <ShowError error={errors.phone.message!} />}
      </div>

      <div className="col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Mensaje
        </label>
        <textarea
          rows={4}
          {...register("message", { required: true })}
          className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
          placeholder="Escribí tu mensaje aca"
        ></textarea>
        {errors.message && <ShowError error={errors.message.message!} />}
      </div>

      <Button
        type="submit"
        className="col-span-2 text-white  w-full py-8 text-lg bg-secondary"
      >
        Enviar consulta
      </Button>
    </form>
  );
};
