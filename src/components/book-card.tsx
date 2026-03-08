"use client";

import { deleteBook, toggleVote } from "@/lib/actions/books";
import { getVoterColors } from "@/lib/colors";
import Image from "next/image";
import { useState, useEffect } from "react";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  coverUrl: string | null;
  addedBy: string | null;
  voteCount: number;
  voters: string[];
  username: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function BookCard({ id, title, author, coverUrl, addedBy, voteCount, voters, username }: BookCardProps) {
  const [showVoters, setShowVoters] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);

  const hasVoted = username ? voters.includes(username) : false;
  const myColors = getVoterColors(username);
  const reversedVoters = [...voters].reverse();
  const visibleInitials = reversedVoters.slice(0, 4);
  const extraCount = voters.length - 4;

  useEffect(() => {
    if (showDetail) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDetailVisible(true));
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showDetail]);

  function handleCloseDetail() {
    setDetailVisible(false);
    setTimeout(() => setShowDetail(false), 300);
  }

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-xl border border-cream-dark bg-warm-white shadow-sm transition-shadow hover:shadow-md cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
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
          <div
            className={`absolute bottom-2 right-2 flex items-center rounded-full py-1.5 pl-3 shadow-sm backdrop-blur-sm bg-white/90 hover:bg-white transition-colors ${voters.length > 0 ? "pr-1.5" : "pr-3"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Heart vote button */}
            <form
              action={() => toggleVote(id, username)}
              className="flex items-center"
            >
              <button
                type="submit"
                className={`flex items-center gap-1.5 text-sm font-semibold ${
                  hasVoted ? "text-[#E04080]" : "text-brown"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={hasVoted ? "#E04080" : "none"} stroke={hasVoted ? "#E04080" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.5 12 21 12 21Z" />
                </svg>
                <span>{voteCount}</span>
              </button>
            </form>

            {/* Avatar group — click to expand list */}
            {voters.length > 0 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowVoters(!showVoters); }}
                className="ml-2 flex items-center transition-opacity hover:opacity-80"
              >
                {visibleInitials.map((name, i) => {
                  const colors = getVoterColors(name);
                  return (
                    <span
                      key={i}
                      className="-ml-2 first:ml-0 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        backgroundColor: colors.light,
                        color: colors.strong,
                        boxShadow: "0 0 0 2px white",
                        zIndex: visibleInitials.length - i,
                      }}
                      title={name}
                    >
                      {getInitials(name)}
                    </span>
                  );
                })}
                {extraCount > 0 && (
                  <span
                    className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-cream-dark text-[10px] font-semibold text-brown-light"
                    style={{
                      boxShadow: "0 0 0 2px white",
                    }}
                  >
                    +{extraCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Expanded voter list */}
          {showVoters && voters.length > 0 && (
            <div
              className="absolute bottom-12 right-2 z-10 min-w-[120px] rounded-xl border border-cream-dark bg-warm-white p-2 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-brown-light/60">
                Votos
              </p>
              {voters.map((name, i) => {
                const colors = getVoterColors(name);
                return (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-1.5 py-1">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{
                        backgroundColor: `${colors.strong}26`,
                        color: colors.strong,
                      }}
                    >
                      {getInitials(name)}
                    </span>
                    <span className="text-xs text-brown">{name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex h-[108px] flex-col p-4">
          <div>
            <h3 className="line-clamp-2 font-serif text-base font-semibold leading-tight text-brown">
              {title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-brown-light">{author}</p>
          </div>

          {addedBy && (
            <div className="mt-auto flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-brown-light/60">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="truncate text-xs text-brown-light/60">{addedBy}</span>
            </div>
          )}
        </div>

        {/* Delete button */}
        <form
          action={() => deleteBook(id)}
          className="absolute bottom-2 right-2"
          onClick={(e) => e.stopPropagation()}
        >
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

      {/* Detail popup */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className={`absolute inset-0 bg-brown/40 backdrop-blur-sm transition-opacity duration-300 ${
              detailVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleCloseDetail}
          />
          <div
            className={`relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-warm-white shadow-xl transition-all duration-300 ${
              detailVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {/* Cover */}
            {coverUrl ? (
              <div className="relative aspect-[3/4] w-full bg-cream-dark">
                <Image
                  src={coverUrl}
                  alt={`Portada de ${title}`}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-sage/20 to-forest/20 p-8">
                <span className="text-center font-serif text-2xl font-semibold text-brown-light">
                  {title}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="p-5">
              <h2 className="font-serif text-xl font-bold text-brown">{title}</h2>
              <p className="mt-1 text-sm text-brown-light">{author}</p>

              {addedBy && (
                <div className="mt-3 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brown-light/60">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-xs text-brown-light/60">Añadido por {addedBy}</span>
                </div>
              )}

              <button
                onClick={handleCloseDetail}
                className="mt-4 w-full rounded-full border border-cream-dark py-2.5 text-sm font-medium text-brown-light transition-colors hover:bg-cream-dark"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
