import { db } from "@/db";
import { books, votes } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { AddBookForm } from "@/components/add-book-form";
import { BookCard } from "@/components/book-card";
import { BooksIllustration } from "@/components/books-illustration";

export default async function Home() {
  const allBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      coverUrl: books.coverUrl,
      addedBy: books.addedBy,
      createdAt: books.createdAt,
      voteCount: sql<number>`count(${votes.id})`.as("vote_count"),
      hasVoted: sql<number>`sum(case when ${votes.voterId} = 'anonymous' then 1 else 0 end)`.as("has_voted"),
    })
    .from(books)
    .leftJoin(votes, eq(books.id, votes.bookId))
    .groupBy(books.id)
    .orderBy(desc(sql`vote_count`), desc(books.createdAt));

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-5xl px-6 pt-8 pb-12">
        <h1 className="font-serif text-4xl font-bold text-brown">
          Bienvenido al Book Club
        </h1>
        <ol className="mt-2 list-decimal list-inside text-brown-light">
          <li>Añade un libro que te apetezca leer</li>
          <li>Vota tantos libros como quieras</li>
        </ol>

        {allBooks.length === 0 ? (
          <div className="mt-8 flex flex-col items-center text-center">
            <BooksIllustration className="w-56" />
            <h2 className="mt-8 font-serif text-2xl font-bold text-brown">
              Aún no hay libros
            </h2>
            <p className="mt-2 text-brown-light">
              ¡Añade el primero para empezar!
            </p>
            <div className="mt-6">
              <AddBookForm />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <AddBookForm />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {allBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  addedBy={book.addedBy}
                  voteCount={book.voteCount}
                  hasVoted={!!book.hasVoted}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
