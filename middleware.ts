import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const username = request.cookies.get("bookclub-username")?.value;

  if (!username && !request.nextUrl.pathname.startsWith("/welcome")) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  if (username && request.nextUrl.pathname.startsWith("/welcome")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
