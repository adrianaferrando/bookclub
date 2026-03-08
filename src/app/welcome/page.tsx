import Image from "next/image";
import { WelcomeForm } from "@/components/welcome-form";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <Image
          src="/welcome-illustration.png"
          alt="Librería acogedora"
          width={400}
          height={400}
          className="mx-auto w-80"
          priority
        />

        <h1 className="mt-6 font-serif text-3xl font-bold text-brown">
          Bienvenido/a a Caos Literario
        </h1>
        <p className="mt-2 text-brown-light">
          Escribe tu nombre para empezar.
        </p>

        <WelcomeForm />
      </div>
    </div>
  );
}
