"use client";

import { addBook } from "@/lib/actions/books";
import { useRef, useState, useEffect, useCallback } from "react";

interface BookSuggestion {
  title: string;
  author: string;
  coverId?: number;
}

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function AddBookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Autocomplete state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [suggestions, setSuggestions] = useState<BookSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [authorAutoFilled, setAuthorAutoFilled] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Search Open Library for suggestions
  const searchBooks = useCallback(
    debounce(async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      try {
        const encoded = encodeURIComponent(query);
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encoded}&limit=5&fields=title,author_name,cover_i`
        );
        const data = await res.json();

        const results: BookSuggestion[] = (data.docs || [])
          .filter((doc: { title?: string; author_name?: string[] }) => doc.title && doc.author_name?.length)
          .map((doc: { title: string; author_name: string[]; cover_i?: number }) => ({
            title: doc.title,
            author: doc.author_name[0],
            coverId: doc.cover_i,
          }));

        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 400),
    []
  );

  function handleTitleChange(value: string) {
    setTitle(value);
    setAuthorAutoFilled(false);
    searchBooks(value);
  }

  function handleSelectSuggestion(suggestion: BookSuggestion) {
    setTitle(suggestion.title);
    setAuthor(suggestion.author);
    setAuthorAutoFilled(true);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setTitle("");
      setAuthor("");
      setSuggestions([]);
      setShowSuggestions(false);
      setAuthorAutoFilled(false);
      formRef.current?.reset();
    }, 300);
  }

  async function handleSubmit(formData: FormData) {
    await addBook(formData);
    handleClose();
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                {/* Title with autocomplete */}
                <div className="relative" ref={suggestionsRef}>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-brown-light"
                  >
                    Título
                  </label>
                  <div className="relative">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      autoFocus
                      autoComplete="off"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      placeholder="Empieza a escribir el título..."
                      className="mt-1 w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-brown placeholder:text-brown-light/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-sage border-t-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Suggestions dropdown */}
                  {showSuggestions && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-cream-dark bg-warm-white shadow-lg">
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectSuggestion(s)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-cream"
                        >
                          {s.coverId ? (
                            <img
                              src={`https://covers.openlibrary.org/b/id/${s.coverId}-S.jpg`}
                              alt=""
                              className="h-10 w-7 flex-shrink-0 rounded object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-7 flex-shrink-0 items-center justify-center rounded bg-cream-dark text-xs text-brown-light">
                              📖
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-brown">
                              {s.title}
                            </p>
                            <p className="truncate text-xs text-brown-light">
                              {s.author}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Author field */}
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-brown-light"
                  >
                    Autor/a
                  </label>
                  <div className="relative">
                    <input
                      id="author"
                      name="author"
                      type="text"
                      required
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                        setAuthorAutoFilled(false);
                      }}
                      placeholder="Quien lo escribió"
                      className={`mt-1 w-full rounded-xl border px-4 py-3 text-brown placeholder:text-brown-light/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-colors ${
                        authorAutoFilled
                          ? "border-sage/40 bg-sage/5"
                          : "border-cream-dark bg-cream"
                      }`}
                    />
                    {authorAutoFilled && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-xs text-sage-dark">
                        ✓ autocompletado
                      </span>
                    )}
                  </div>
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
