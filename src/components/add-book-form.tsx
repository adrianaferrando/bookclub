"use client";

import { addBook } from "@/lib/actions/books";
import { useRef, useState } from "react";

export function AddBookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await addBook(formData);
    formRef.current?.reset();
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-forest/25 transition-all hover:bg-sage-dark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/30"
      >
        + Añadir un libro
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="rounded-xl border border-cream-dark bg-warm-white p-6 shadow-sm"
    >
      <h2 className="font-serif text-xl font-semibold text-brown">
        Añadir libro
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-brown-light">
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="El nombre del libro"
            className="mt-1 w-full rounded-lg border border-cream-dark bg-cream px-4 py-2 text-brown placeholder:text-brown-light/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-brown-light">
            Autor/a
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            placeholder="Quien lo escribió"
            className="mt-1 w-full rounded-lg border border-cream-dark bg-cream px-4 py-2 text-brown placeholder:text-brown-light/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
        >
          Añadir
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-full px-5 py-2 text-sm font-medium text-brown-light transition-colors hover:bg-cream-dark"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
