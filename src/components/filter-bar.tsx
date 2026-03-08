"use client";

import { useState } from "react";

export type SortOrder = "desc" | "asc";
export type Filters = {
  sortOrder: SortOrder;
  myVotesOnly: boolean;
  addedByUser: string | null;
};

interface FilterBarProps {
  addedByUsers: string[];
  onChange: (filters: Filters) => void;
}

export function FilterBar({ addedByUsers, onChange }: FilterBarProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [myVotesOnly, setMyVotesOnly] = useState(false);
  const [addedByUser, setAddedByUser] = useState<string | null>(null);

  function update(partial: Partial<Filters>) {
    const next = {
      sortOrder: partial.sortOrder ?? sortOrder,
      myVotesOnly: partial.myVotesOnly ?? myVotesOnly,
      addedByUser: partial.addedByUser !== undefined ? partial.addedByUser : addedByUser,
    };
    if (partial.sortOrder !== undefined) setSortOrder(next.sortOrder);
    if (partial.myVotesOnly !== undefined) setMyVotesOnly(next.myVotesOnly);
    if (partial.addedByUser !== undefined) setAddedByUser(next.addedByUser);
    onChange(next);
  }

  const chipBase =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap";
  const chipActive =
    "border-forest/30 bg-forest/10 text-forest";
  const chipInactive =
    "border-cream-dark bg-warm-white text-brown-light hover:bg-cream-dark/50";

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
      {/* Sort toggle */}
      <button
        type="button"
        onClick={() => update({ sortOrder: sortOrder === "desc" ? "asc" : "desc" })}
        className={`${chipBase} ${chipInactive}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {sortOrder === "desc" ? (
            <>
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </>
          ) : (
            <>
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </>
          )}
        </svg>
        {sortOrder === "desc" ? "Más votados" : "Menos votados"}
      </button>

      {/* My votes filter */}
      <button
        type="button"
        onClick={() => update({ myVotesOnly: !myVotesOnly })}
        className={`${chipBase} ${myVotesOnly ? chipActive : chipInactive}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={myVotesOnly ? "#3D5A3A" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.5 12 21 12 21Z" />
        </svg>
        Mis votos
      </button>

      {/* Added by filter */}
      {addedByUsers.length > 0 && (
        <div className="relative">
          <select
            value={addedByUser || ""}
            onChange={(e) =>
              update({ addedByUser: e.target.value || null })
            }
            className={`${chipBase} cursor-pointer appearance-none pr-7 ${
              addedByUser ? chipActive : chipInactive
            }`}
          >
            <option value="">Añadido por…</option>
            {addedByUsers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      )}

      {/* Clear filters */}
      {(myVotesOnly || addedByUser) && (
        <button
          type="button"
          onClick={() => update({ myVotesOnly: false, addedByUser: null })}
          className={`${chipBase} ${chipInactive} text-brown-light/50`}
        >
          Limpiar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
