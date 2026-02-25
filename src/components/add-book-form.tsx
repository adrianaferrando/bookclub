"use client";

import { addBook } from "@/lib/actions/books";
import { useRef, useState, useEffect } from "react";

export function AddBookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      formRef.current?.reset();
    }, 300);
  }

  async function handleSubmit(formData: FormData) {
    await addBook(formData);
    formRef.current?.reset();
    handleClose();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-forest/25 transition-all hover:bg-sage-dark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/30"
      >
        + Añadir un libro
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-brown/40 backdrop-blur-sm transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          {/* Bottom Sheet */}
          <div
            className={`relative w-full max-w-lg h-[75dvh] transform transition-transform duration-300 ease-out ${
              isVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex h-full flex-col rounded-t-2xl bg-warm-white px-6 pt-3 pb-10 shadow-xl">
              {/* Handle bar */}
              <div className="mb-4 flex justify-center">
                <div className="h-1.5 w-10 rounded-full bg-cream-dark" />
              </div>

              <h2 className="font-serif text-xl font-semibold text-brown">
                Añadir libro
              </h2>

              <form
                ref={formRef}
                action={handleSubmit}
                className="mt-5 flex flex-1 flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-brown-light"
                  >
                    Título
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    autoFocus
                    placeholder="El nombre del libro"
                    className="mt-1 w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-brown placeholder:text-brown-light/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-brown-light"
                  >
                    Autor/a
                  </label>
                  <input
                    id="author"
                    name="author"
                    type="text"
                    required
                    placeholder="Quien lo escribió"
                    className="mt-1 w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-brown placeholder:text-brown-light/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-forest py-3 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
                  >
                    Añadir
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full rounded-full border border-cream-dark py-3 text-sm font-medium text-brown-light transition-colors hover:bg-cream-dark"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
