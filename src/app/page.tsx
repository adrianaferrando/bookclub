import { cookies } from "next/headers";
import { db } from "@/db";
import { books, votes } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { AddBookForm } from "@/components/add-book-form";
import { BookCard } from "@/components/book-card";
import { BooksIllustration } from "@/components/books-illustration";

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("bookclub-username")?.value || "";
  const allBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      coverUrl: books.coverUrl,
      addedBy: books.addedBy,
      createdAt: books.createdAt,
      voteCount: sql<number>`count(${votes.id})`.as("vote_count"),
    })
    .from(books)
    .leftJoin(votes, eq(books.id, votes.bookId))
    .groupBy(books.id)
    .orderBy(desc(sql`vote_count`), desc(books.createdAt));

  // Get all voters grouped by book
  const allVotes = await db
    .select({
      bookId: votes.bookId,
      voterId: votes.voterId,
    })
    .from(votes);

  const votersByBook = new Map<number, string[]>();
  for (const vote of allVotes) {
    const existing = votersByBook.get(vote.bookId) || [];
    existing.push(vote.voterId);
    votersByBook.set(vote.bookId, existing);
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-5xl px-6 pt-8 pb-12">
        <h1 className="font-serif text-4xl font-bold text-brown">
          Librería de votaciones
        </h1>
        <ol className="mt-2 list-decimal list-inside text-brown-light">
          <li>{username}, añade libros que te apetezca leer con el club.</li>
          <li>Vota los libros que te gustaría que salieran en la próxima lectura del club.</li>
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
              <AddBookForm username={username} />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <AddBookForm username={username} />
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
                  voters={votersByBook.get(book.id) || []}
                  username={username}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
