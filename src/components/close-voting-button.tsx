"use client";

import { useState } from "react";
import { closeVoting } from "@/lib/actions/books";

export function CloseVotingButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClose() {
    const result = await closeVoting();
    if (result.error) {
      setError(result.error);
      setTimeout(() => setError(null), 3000);
    }
    setShowConfirm(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="rounded-full border border-forest/30 bg-forest/10 px-4 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest/20 whitespace-nowrap"
      >
        Cerrar votación
      </button>

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-8">
          <div
            className="absolute inset-0 bg-brown/50"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative w-full max-w-xs rounded-2xl bg-warm-white p-6 shadow-xl text-center">
            <p className="font-serif text-base font-semibold text-brown">
              ¿Cerrar la votación de este mes?
            </p>
            <p className="mt-2 text-xs text-brown-light">
              El libro más votado se marcará como lectura del mes. Se borrarán todos los votos y el resto de libros pasará al siguiente mes.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-full bg-forest py-2 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
              >
                Cerrar votación
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-full border border-cream-dark py-2 text-sm font-medium text-brown-light transition-colors hover:bg-cream-dark"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
