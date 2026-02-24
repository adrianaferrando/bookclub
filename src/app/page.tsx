import { db } from "@/db";
import { books, votes } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { AddBookForm } from "@/components/add-book-form";
import { BookCard } from "@/components/book-card";

export default async function Home() {
  const allBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      coverUrl: books.coverUrl,
      createdAt: books.createdAt,
      voteCount: sql<number>`count(${votes.id})`.as("vote_count"),
    })
    .from(books)
    .leftJoin(votes, eq(books.id, votes.bookId))
    .groupBy(books.id)
    .orderBy(desc(sql`vote_count`), desc(books.createdAt));

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-cream-dark bg-warm-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h1 className="font-serif text-4xl font-bold text-brown">
            Book Club
          </h1>
          <p className="mt-2 text-brown-light">
            Añade libros y vota por el próximo que leeremos juntos
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <AddBookForm />

        {allBooks.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-serif text-2xl text-brown-light">
              Aún no hay libros
            </p>
            <p className="mt-2 text-brown-light">
              ¡Añade el primero usando el formulario de arriba!
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {allBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
                voteCount={book.voteCount}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
