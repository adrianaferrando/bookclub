import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const author = request.nextUrl.searchParams.get("author");

  if (!title || !author) {
    return NextResponse.json({ description: null });
  }

  try {
    const query = encodeURIComponent(`intitle:${title}+inauthor:${author}`);

    // Try Spanish first
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&langRestrict=es`
    );
    const data = await res.json();
    let description = data.items?.[0]?.volumeInfo?.description;

    // Fallback: any language
    if (!description) {
      const res2 = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`intitle:${title}+inauthor:${author}`)}&maxResults=1`
      );
      const data2 = await res2.json();
      description = data2.items?.[0]?.volumeInfo?.description;
    }

    if (description) {
      description = description.replace(/<[^>]*>/g, "");
    }

    return NextResponse.json({ description: description || null });
  } catch {
    return NextResponse.json({ description: null });
  }
}
