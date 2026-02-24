export function BooksIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Estantería - fondo */}
      <rect x="40" y="30" width="160" height="140" rx="3" fill="#D4C4A8" opacity="0.15" />

      {/* Estantería - laterales */}
      <rect x="38" y="25" width="6" height="150" rx="2" fill="#C4A882" />
      <rect x="196" y="25" width="6" height="150" rx="2" fill="#C4A882" />

      {/* Estantería - tope */}
      <rect x="36" y="22" width="168" height="6" rx="2" fill="#D4B896" />

      {/* Estantería - balda del medio */}
      <rect x="44" y="90" width="152" height="5" rx="1" fill="#C4A882" />

      {/* Estantería - base */}
      <rect x="36" y="170" width="168" height="6" rx="2" fill="#D4B896" />

      {/* Sombra interior arriba */}
      <rect x="44" y="28" width="152" height="3" fill="#C4A882" opacity="0.2" />

      {/* Sombra interior debajo de balda */}
      <rect x="44" y="95" width="152" height="3" fill="#C4A882" opacity="0.2" />

      {/* Telaraña esquina superior derecha */}
      <path d="M196 28 C185 28, 180 33, 180 42" stroke="#C4A882" strokeWidth="0.5" opacity="0.5" />
      <path d="M196 28 C188 32, 184 38, 184 48" stroke="#C4A882" strokeWidth="0.5" opacity="0.4" />
      <path d="M196 28 C192 36, 190 42, 190 50" stroke="#C4A882" strokeWidth="0.5" opacity="0.35" />
      <path d="M196 28 C194 38, 194 44, 195 52" stroke="#C4A882" strokeWidth="0.5" opacity="0.3" />
      {/* Hilos horizontales de la telaraña */}
      <path d="M182 36 C186 34, 190 35, 194 33" stroke="#C4A882" strokeWidth="0.4" opacity="0.35" />
      <path d="M181 44 C186 41, 191 42, 195 40" stroke="#C4A882" strokeWidth="0.4" opacity="0.3" />
      <path d="M184 50 C188 48, 192 48, 195 47" stroke="#C4A882" strokeWidth="0.4" opacity="0.25" />

      {/* Pequeña araña */}
      <circle cx="186" cy="40" r="1.2" fill="#7A6455" opacity="0.5" />
      <path d="M185 39 L183 37" stroke="#7A6455" strokeWidth="0.4" opacity="0.4" />
      <path d="M187 39 L189 37" stroke="#7A6455" strokeWidth="0.4" opacity="0.4" />
      <path d="M185 41 L183 43" stroke="#7A6455" strokeWidth="0.4" opacity="0.4" />
      <path d="M187 41 L189 43" stroke="#7A6455" strokeWidth="0.4" opacity="0.4" />

      {/* Motitas de polvo */}
      <circle cx="70" cy="86" r="0.8" fill="#C4A882" opacity="0.3" />
      <circle cx="130" cy="88" r="0.6" fill="#C4A882" opacity="0.25" />
      <circle cx="160" cy="85" r="0.7" fill="#C4A882" opacity="0.3" />
      <circle cx="90" cy="165" r="0.8" fill="#C4A882" opacity="0.3" />
      <circle cx="150" cy="167" r="0.6" fill="#C4A882" opacity="0.25" />

      {/* Marca sutil de donde podría ir un libro (sombra fantasma) */}
      <rect x="60" y="95" width="14" height="70" rx="1" fill="#C4A882" opacity="0.08" />
      <rect x="80" y="95" width="18" height="70" rx="1" fill="#C4A882" opacity="0.06" />
      <rect x="104" y="95" width="12" height="70" rx="1" fill="#C4A882" opacity="0.08" />
    </svg>
  );
}
