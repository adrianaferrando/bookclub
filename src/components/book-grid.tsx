"use client";

import { useState, useMemo } from "react";
import { BookCard } from "./book-card";
import { FilterBar, type Filters } from "./filter-bar";

interface BookData {
  id: number;
  title: string;
  author: string;
  coverUrl: string | null;
  addedBy: string | null;
  voteCount: number;
  voters: string[];
}

interface BookGridProps {
  books: BookData[];
  username: string;
}

export function BookGrid({ books, username }: BookGridProps) {
  const [filters, setFilters] = useState<Filters>({
    sortOrder: "desc",
    myVotesOnly: false,
    addedByUser: null,
  });

  const addedByUsers = useMemo(() => {
    const names = new Set<string>();
    for (const book of books) {
      if (book.addedBy) names.add(book.addedBy);
    }
    return Array.from(names).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Filter: my votes only
    if (filters.myVotesOnly) {
      result = result.filter((b) => b.voters.includes(username));
    }

    // Filter: added by user
    if (filters.addedByUser) {
      result = result.filter((b) => b.addedBy === filters.addedByUser);
    }

    // Sort by votes
    result.sort((a, b) =>
      filters.sortOrder === "desc"
        ? b.voteCount - a.voteCount
        : a.voteCount - b.voteCount
    );

    return result;
  }, [books, filters, username]);

  return (
    <>
      <div className="mt-6">
        <FilterBar addedByUsers={addedByUsers} onChange={setFilters} />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-sm text-brown-light">
            No hay libros que coincidan con los filtros.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              addedBy={book.addedBy}
              voteCount={book.voteCount}
              voters={book.voters}
              username={username}
              status="active"
            />
          ))}
        </div>
      )}
    </>
  );
}
