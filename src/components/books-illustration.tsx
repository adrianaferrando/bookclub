export function BooksIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Mesa / superficie */}
      <ellipse cx="140" cy="175" rx="120" ry="8" fill="#EDE8E0" />

      {/* Libro tumbado abajo */}
      <rect x="80" y="148" width="85" height="12" rx="2" fill="#87A878" />
      <rect x="80" y="148" width="85" height="2" rx="1" fill="#5C7A4E" />

      {/* Libro tumbado abajo 2 */}
      <rect x="75" y="136" width="90" height="12" rx="2" fill="#C4A882" />
      <rect x="75" y="136" width="90" height="2" rx="1" fill="#A88B6A" />

      {/* Libro vertical izquierda */}
      <rect x="78" y="52" width="22" height="84" rx="2" fill="#3D5A3A" />
      <rect x="80" y="56" width="1.5" height="76" rx="0.75" fill="#5C7A4E" opacity="0.5" />
      <rect x="85" y="65" width="10" height="2" rx="1" fill="#87A878" opacity="0.7" />
      <rect x="85" y="70" width="7" height="1.5" rx="0.75" fill="#87A878" opacity="0.5" />

      {/* Libro vertical 2 */}
      <rect x="102" y="58" width="18" height="78" rx="2" fill="#D4A574" />
      <rect x="104" y="62" width="1.5" height="70" rx="0.75" fill="#C4956A" opacity="0.5" />
      <rect x="108" y="72" width="8" height="2" rx="1" fill="#FFF" opacity="0.3" />

      {/* Libro vertical 3 - más alto */}
      <rect x="122" y="42" width="24" height="94" rx="2" fill="#7A6455" />
      <rect x="124" y="46" width="1.5" height="86" rx="0.75" fill="#6A5445" opacity="0.5" />
      <rect x="129" y="55" width="12" height="2" rx="1" fill="#EDE8E0" opacity="0.5" />
      <rect x="129" y="60" width="8" height="1.5" rx="0.75" fill="#EDE8E0" opacity="0.3" />

      {/* Libro vertical 4 */}
      <rect x="148" y="55" width="20" height="81" rx="2" fill="#87A878" />
      <rect x="150" y="59" width="1.5" height="73" rx="0.75" fill="#6A9060" opacity="0.5" />

      {/* Libro vertical 5 - ligeramente inclinado */}
      <g transform="rotate(5 180 136)">
        <rect x="170" y="60" width="18" height="76" rx="2" fill="#4A3728" />
        <rect x="172" y="64" width="1.5" height="68" rx="0.75" fill="#6A5748" opacity="0.5" />
        <rect x="176" y="74" width="8" height="2" rx="1" fill="#C4A882" opacity="0.5" />
      </g>

      {/* Taza */}
      <ellipse cx="215" cy="148" rx="16" ry="4" fill="#EDE8E0" />
      <path d="M199 148 C199 148, 199 168, 215 168 C231 168, 231 148, 231 148" fill="#FFFDF9" stroke="#EDE8E0" strokeWidth="1.5" />
      <ellipse cx="215" cy="148" rx="14" ry="3" fill="#FFFDF9" />
      <ellipse cx="215" cy="148" rx="11" ry="2" fill="#D4C4A8" opacity="0.4" />
      {/* Asa */}
      <path d="M231 152 C237 152, 240 156, 240 160 C240 164, 237 166, 231 166" fill="none" stroke="#EDE8E0" strokeWidth="2" />
      {/* Vapor */}
      <path d="M210 140 C210 136, 213 134, 213 130" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M216 138 C216 134, 219 132, 219 128" stroke="#C4A882" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M222 140 C222 136, 225 134, 225 130" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round" />

      {/* Plantita */}
      <rect x="50" y="110" width="14" height="16" rx="3" fill="#D4A574" />
      <path d="M57 110 C57 100, 50 95, 48 88" stroke="#87A878" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M57 108 C57 100, 63 96, 66 90" stroke="#87A878" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M57 105 C54 98, 58 92, 55 85" stroke="#5C7A4E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Hojas */}
      <ellipse cx="46" cy="87" rx="5" ry="3" transform="rotate(-30 46 87)" fill="#87A878" />
      <ellipse cx="67" cy="89" rx="5" ry="3" transform="rotate(20 67 89)" fill="#87A878" />
      <ellipse cx="54" cy="83" rx="4" ry="2.5" transform="rotate(-10 54 83)" fill="#5C7A4E" />
    </svg>
  );
}
