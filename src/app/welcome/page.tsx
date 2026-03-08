import { WelcomeForm } from "@/components/welcome-form";
import { BooksIllustration } from "@/components/books-illustration";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <BooksIllustration className="mx-auto w-32" />

        <h1 className="mt-6 font-serif text-3xl font-bold text-brown">
          Book Club
        </h1>
        <p className="mt-2 text-brown-light">
          Bienvenido. Dinos tu nombre para empezar.
        </p>

        <WelcomeForm />
      </div>
    </div>
  );
}
