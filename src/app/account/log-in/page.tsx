'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '../actions';

export default function LogIn() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    <main className="grid border-4 border-amber-50 rounded-xl w-fit m-4 px-8 py-4">
      <div className="py-2 text-center">
        <h2 className="text-3xl py-4">Welcome back!</h2>
      </div>

      {state?.error && (
        <p className="text-red-800" role="alert">
          {state.error}
        </p>
      )}

      <form action={formAction}>
        <div className="grid py-2">
          <label className="py-2 text-xl" htmlFor="email">Your Email</label>
          <input 
            className="border-2 rounded-sm p-2 w-fit" 
            type="email" 
            id="email" 
            name="email" 
            placeholder="user@useremail.com"
            required 
            />
        </div>

        <div className="grid py-2">
          <label className="py-2 text-xl" htmlFor="password">Your Password</label>
          <input
            className="border-2 rounded-sm p-2 w-fit"
            type="password"
            id="password"
            name="password"
            minLength={8}
            placeholder="xxxxxxxx"
            required
          />
        </div>
        
        <div className="flex justify-center gap-6 pt-6">
          <button className="border-3 border-black dark:border-white rounded-lg text-xl px-6 w-fit hover:cursor-pointer hover:bg-blue-400 transition-colors"
            type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log In'}
          </button>
          <Link className="border-3 border-black dark:border-white rounded-lg text-xl px-6 w-fit hover:cursor-pointer hover:bg-red-800 transition-colors text-center" 
            href="/">Cancel</Link>
          </div>
      </form>
    </main>
    </div>
  );
}
