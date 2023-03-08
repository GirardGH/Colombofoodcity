import React from "react";

export default function SignIn() {
  return (
    <div>
      <div className="flex flex-col my-4">
        <h1 className="font-bold text-xl text-center my-2">
          J'ai déjà un compte
        </h1>
        <p className="italic text-center">
          Connectez-vous avec votre adresse e-mail et votre mot de passe
        </p>
        <form className="flex flex-col">
          <input
            className="border-b border-zinc-400 my-8 text-lg outline-none"
            type="email"
            placeholder="Adresse e-mail"
          />
          <input
            className="border-b border-zinc-400 outline-none"
            type="password"
            placeholder="Mot de passe"
          />
          <p className="text-sm my-2 underline">Mot de passe oublié ?</p>
          <button
            className="bg-black text-white rounded-3xl w-fit px-4 py-3 font-semibold my-4"
            type="submit"
          >
            ME CONNECTER
          </button>
        </form>
      </div>
    </div>
  );
}
