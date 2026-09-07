'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '../utils/supabase/server';

export type AuthState = {
  error?: string;
  message?: string;
} | null;

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/collection');
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  if (!email || !password) {
    return { error: 'Please fill in all required fields.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
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
    return { error: error.message };
  }

  // If email confirmation is disabled in Supabase, a session is returned immediately
  if (data?.session) {
    revalidatePath('/', 'layout');
    redirect('/collection');
  }

  // If email confirmation is enabled, Supabase requires the user to click a confirmation email
  return {
    message: 'Account created! Please check your email to confirm your account.',
  };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

