"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setUsername(formData: FormData) {
  const username = (formData.get("username") as string)?.trim();

  if (!username) return;

  const cookieStore = await cookies();
  cookieStore.set("bookclub-username", username, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
  });

  redirect("/");
}
