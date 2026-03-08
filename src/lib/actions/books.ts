"use server";

import { db } from "@/db";
import { books, votes } from "@/db/schema";
import { eq, sql, asc, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addBook(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const addedBy = formData.get("addedBy") as string;

  if (!title?.trim() || !author?.trim()) return;

  // Buscar portada en Open Library (prioriza edición en español)
  let coverUrl: string | null = null;
  try {
    const titleQuery = encodeURIComponent(title.trim());
    const authorQuery = encodeURIComponent(author.trim());

    // Primero buscar edición en español
    const esRes = await fetch(
      `https://openlibrary.org/search.json?title=${titleQuery}&author=${authorQuery}&language=spa&limit=1&fields=cover_i`
    );
    const esData = await esRes.json();
    if (esData.docs?.[0]?.cover_i) {
      coverUrl = `https://covers.openlibrary.org/b/id/${esData.docs[0].cover_i}-M.jpg`;
    }

    // Si no hay portada en español, buscar cualquier edición
    if (!coverUrl) {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${titleQuery}&author=${authorQuery}&limit=1&fields=cover_i`
      );
      const data = await res.json();
      if (data.docs?.[0]?.cover_i) {
        coverUrl = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-M.jpg`;
      }
    }
  } catch {
    // Si falla la búsqueda de portada, continuamos sin ella
  }

  await db.insert(books).values({
    title: title.trim(),
    author: author.trim(),
    coverUrl,
    addedBy: addedBy?.trim() || null,
  });

  revalidatePath("/");
}

export async function deleteBook(bookId: number) {
  await db.delete(books).where(eq(books.id, bookId));
  revalidatePath("/");
}

export async function closeVoting() {
  const today = new Date();
  const day = today.getDate();

  if (day > 3) {
    return { error: "Solo se puede cerrar la votación entre el día 1 y 3 del mes." };
  }

  // Buscar el libro activo con más votos (empate → más antiguo)
  const winner = await db
    .select({
      id: books.id,
      voteCount: sql<number>`count(${votes.id})`.as("vote_count"),
    })
    .from(books)
    .leftJoin(votes, eq(books.id, votes.bookId))
    .where(eq(books.status, "active"))
    .groupBy(books.id)
    .orderBy(desc(sql`vote_count`), asc(books.createdAt))
    .limit(1);

  if (!winner[0] || winner[0].voteCount === 0) {
    return { error: "No hay libros con votos para cerrar la votación." };
  }

  const month = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  // Marcar ganador como leído
  await db
    .update(books)
    .set({ status: "read", readAt: month })
    .where(eq(books.id, winner[0].id));

  // Borrar todos los votos
  await db.delete(votes);

  revalidatePath("/");
  return { success: true };
}

export async function toggleVote(bookId: number, voterId: string) {
  const existingVote = await db.query.votes.findFirst({
    where: (v, { and, eq }) =>
      and(eq(v.bookId, bookId), eq(v.voterId, voterId)),
  });

  if (existingVote) {
    await db.delete(votes).where(eq(votes.id, existingVote.id));
  } else {
    await db.insert(votes).values({ bookId, voterId });
  }

  revalidatePath("/");
}
