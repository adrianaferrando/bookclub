"use client";

import { deleteBook, toggleVote } from "@/lib/actions/books";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  coverUrl: string | null;
  addedBy: string | null;
  voteCount: number;
  voters: string[];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function BookCard({ id, title, author, coverUrl, addedBy, voteCount, voters }: BookCardProps) {
  const [username, setUsername] = useState("");
  const [showVoters, setShowVoters] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bookclub-username");
    if (saved) setUsername(saved);
  }, []);

  const hasVoted = username ? voters.includes(username) : false;
  const visibleInitials = voters.slice(0, 3);
  const extraCount = voters.length - 3;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-cream-dark bg-warm-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full bg-cream-dark">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`Portada de ${title}`}
            width={400}
            height={600}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sage/20 to-forest/20 p-4">
            <span className="text-center font-serif text-lg font-semibold text-brown-light">
              {title}
            </span>
          </div>
        )}

        {/* Vote component */}
        <div className={`absolute bottom-2 right-2 flex items-center rounded-full py-1 pl-2.5 shadow-sm backdrop-blur-sm transition-colors ${
          hasVoted
            ? "bg-[#E04080]/90 hover:bg-[#E04080]"
            : "bg-white/90 hover:bg-white"
        } ${voters.length > 0 ? "pr-1.5" : "pr-2.5"}`}>
          {/* Heart vote button */}
          <form
            action={() => {
              const name = username || "anonymous";
              toggleVote(id, name);
            }}
            className="flex items-center"
          >
            <button
              type="submit"
              className={`flex items-center gap-1 text-sm font-medium ${
                hasVoted ? "text-white" : "text-brown"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={hasVoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.5 12 21 12 21Z" />
              </svg>
              <span>{voteCount}</span>
            </button>
          </form>

          {/* Voter initials — click to expand list */}
          {voters.length > 0 && (
            <button
              type="button"
              onClick={() => setShowVoters(!showVoters)}
              className="ml-1.5 flex items-center -space-x-1.5 transition-opacity hover:opacity-80"
            >
              {visibleInitials.map((name, i) => (
                <span
                  key={i}
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ring-1 ${
                    hasVoted
                      ? "bg-white/25 text-white ring-[#E04080]/50"
                      : "bg-[#E04080]/15 text-[#E04080] ring-white"
                  }`}
                  title={name}
                >
                  {getInitials(name)}
                </span>
              ))}
              {extraCount > 0 && (
                <span className={`ml-2 text-xs font-medium ${
                  hasVoted ? "text-white/80" : "text-brown-light"
                }`}>
                  +{extraCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Expanded voter list */}
        {showVoters && voters.length > 0 && (
          <div className="absolute bottom-12 right-2 z-10 min-w-[120px] rounded-xl border border-cream-dark bg-warm-white p-2 shadow-lg">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-brown-light/60">
              Votos
            </p>
            {voters.map((name, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg px-1.5 py-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E04080]/15 text-[9px] font-bold text-[#E04080]">
                  {getInitials(name)}
                </span>
                <span className="text-xs text-brown">{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold leading-tight text-brown">
          {title}
        </h3>
        <p className="mt-1 text-sm text-brown-light">{author}</p>

        {addedBy && (
          <div className="mt-2 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brown-light/60">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs text-brown-light/60">{addedBy}</span>
          </div>
        )}
      </div>

      {/* Delete button */}
      <form action={() => deleteBook(id)} className="absolute bottom-2 right-2">
        <button
          type="submit"
          className="rounded-full p-1.5 text-brown-light/50 opacity-0 transition-all hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
          title="Eliminar libro"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </form>
    </div>
  );
}
