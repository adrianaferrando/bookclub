"use client";

import { deleteBook, toggleVote } from "@/lib/actions/books";
import Image from "next/image";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  coverUrl: string | null;
  addedBy: string | null;
  voteCount: number;
  hasVoted: boolean;
}

export function BookCard({ id, title, author, coverUrl, addedBy, voteCount, hasVoted }: BookCardProps) {
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

        {/* Vote button overlay */}
        <form action={() => toggleVote(id, "anonymous")} className="absolute bottom-2 right-2">
          <button
            type="submit"
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium shadow-sm backdrop-blur-sm transition-colors ${
              hasVoted
                ? "bg-pink-500/90 text-white hover:bg-pink-600"
                : "bg-white/90 text-brown hover:bg-white"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={hasVoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.5 12 21 12 21Z" />
            </svg>
            <span>{voteCount}</span>
          </button>
        </form>
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
