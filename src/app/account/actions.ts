"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "../utils/supabase/server";

export type AuthState = {
  error?: string;
  message?: string;
} | null;

export type AddItemState = {
  error?: string;
  success?: string;
} | null;

/* Log in */

export async function login(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message ?? "Failed to log in." };
  }

  revalidatePath("/", "layout");
  redirect("/collection");
}

/* End of Log in */
/* Sign up */

export async function signup(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (!email || !password) {
    return { error: "Please fill in all required fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || undefined,
      },
    },
  });

  if (error) {
    return { error: error.message ?? "Failed to sign up." };
  }

  // If email confirmation is disabled in Supabase, a session is returned immediately
  if (data?.session) {
    revalidatePath("/", "layout");
    redirect("/collection");
  }

  // If email confirmation is enabled, Supabase requires the user to click a confirmation email
  return {
    message: "Account created! Please check your email to confirm your account.",
  };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

/* End of Sign up */
/* Add to Collection */

function getOptionalInteger(formData: FormData, field: string): number | null {
  const value = String(formData.get(field) ?? "").trim();

  if (!value) return null;
  if (!/^-?\d+$/.test(value)) return Number.NaN;

  return Number(value);
}

export async function addItem(_prevState: AddItemState, formData: FormData): Promise<AddItemState> {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/account/log-in");

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const year = getOptionalInteger(formData, "year");
  const rating = getOptionalInteger(formData, "rating");
  const review = String(formData.get("review") ?? "").trim();

  if (!title || !author) {
    return { error: "Title and author are required." };
  }

  if (title.length > 200 || author.length > 200) {
    return { error: "Title and author cannot be longer than 200 characters." };
  }

  if (Number.isNaN(year)) {
    return { error: "Release year must be a whole number." };
  }

  if (year !== null && (year < 1000 || year > new Date().getFullYear())) {
    return { error: "Invalid release year. Please try again." };
  }

  if (Number.isNaN(rating)) {
    return { error: "Rating must be a whole number." };
  }

  if (rating !== null && (rating < 1 || rating > 5)) {
    return { error: "You can only rate between 1 and 5." };
  }

  if (review.length > 200) {
    return { error: "Review cannot be longer than 200 characters." };
  }

  const { error } = await supabase.from("media_items").insert({
    user_id: user.id,
    title,
    author,
    year,
    status: formData.get("status") === "on" ? "read" : "unread",
    rating,
    review: review || null,
  });

  if (error) return { error: error.message ?? "Failed to add item." };

  revalidatePath("/collection");
  redirect("/collection");

  return { success: "Item was successfully added to your collection!" };
  
  /* End of Add to Collection */
}
