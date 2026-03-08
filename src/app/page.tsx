import { cookies } from "next/headers";
import { db } from "@/db";
import { books, votes } from "@/db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { AddBookForm } from "@/components/add-book-form";
import { BooksIllustration } from "@/components/books-illustration";
import { BookGrid } from "@/components/book-grid";
import { CloseVotingButton } from "@/components/close-voting-button";
import Image from "next/image";

function formatMonth(readAt: string): string {
  const [year, month] = readAt.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
}

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("bookclub-username")?.value || "";

  // Active books with vote counts
  const activeBooks = await db
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
    .where(eq(books.status, "active"))
    .groupBy(books.id)
    .orderBy(desc(sql`vote_count`), desc(books.createdAt));

  // Read books
  const readBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      coverUrl: books.coverUrl,
      readAt: books.readAt,
    })
    .from(books)
    .where(eq(books.status, "read"))
    .orderBy(desc(books.readAt));

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

  // Check if we're in day 1-3 of the month
  const today = new Date();
  const canCloseVoting = today.getDate() <= 3;

  // Prepare book data for BookGrid
  const booksForGrid = activeBooks.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    coverUrl: book.coverUrl,
    addedBy: book.addedBy,
    voteCount: book.voteCount,
    voters: votersByBook.get(book.id) || [],
  }));

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-5xl px-6 pt-8 pb-12">
        <h1 className="font-serif text-4xl font-bold text-brown">
          Librería de votaciones
        </h1>
        <ol className="mt-2 list-decimal list-inside text-sm text-brown-light">
          <li>{username}, añade libros que te apetezca leer con el club.</li>
          <li>Vota los libros que te gustaría que salieran en la próxima lectura del club.</li>
        </ol>

        {activeBooks.length === 0 && readBooks.length === 0 ? (
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
            <div className="mt-6 flex items-center gap-3">
              <AddBookForm username={username} />
              {canCloseVoting && activeBooks.some((b) => b.voteCount > 0) && (
                <CloseVotingButton />
              )}
            </div>

            <BookGrid books={booksForGrid} username={username} />

            {/* Read books history */}
            {readBooks.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-xl font-bold text-brown">
                  Libros leídos
                </h2>
                <div className="mt-4 space-y-3">
                  {readBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-4 rounded-xl border border-cream-dark bg-warm-white p-3"
                    >
                      {book.coverUrl ? (
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          width={40}
                          height={60}
                          className="h-14 w-10 flex-shrink-0 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-sage/20 to-forest/20">
                          <span className="text-[8px] font-semibold text-brown-light">
                            {book.title.slice(0, 3)}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-sm font-semibold text-brown">
                          {book.title}
                        </p>
                        <p className="truncate text-xs text-brown-light">
                          {book.author}
                        </p>
                      </div>
                      {book.readAt && (
                        <span className="flex-shrink-0 text-xs text-brown-light/60 capitalize">
                          {formatMonth(book.readAt)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
