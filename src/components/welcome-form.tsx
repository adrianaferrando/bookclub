"use client";

import { setUsername } from "@/lib/actions/user";
import { useState } from "react";

export function WelcomeForm() {
  const [name, setName] = useState("");

  return (
    <form action={setUsername} className="mt-8">
      <input
        name="username"
        type="text"
        required
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        className="w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-center text-brown placeholder:text-brown-light/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="mt-4 w-full rounded-full bg-forest py-3 text-sm font-medium text-white shadow-lg shadow-forest/25 transition-all hover:bg-sage-dark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/30 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
      >
        Entrar
      </button>
    </form>
  );
}
