'use client';

import Image from 'next/image';
import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '../actions';

export default function LogIn() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="/IMG_4446.jpg"
          alt="Blurry background image showing completed collection"
          fill
          className="object-cover blur-sm opacity-80 scale-105"
          priority
        />
      </div>
      
    <main className="relative my-auto z-10 grid border-3 border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-gray-800 shadow-2xl rounded-xl w-[calc(100%-2rem)] max-w-md px-5 sm:px-8 py-6">
      <div className="py-2 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black dark:text-white">Welcome back!</h2>
        <p>Please enter your email and password to access your shelf.</p>
      </div>

      {state?.error && (
        <p className="text-red-800" role="alert">
          {state.error}
        </p>
      )}

      <form action={formAction}>
        <div className="grid py-2">
          <label className="py-2 text-xl" htmlFor="email">
            Your Email <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input 
            className="border-2 border-slate-200 dark:border-zinc-700 rounded-sm p-2 w-full" 
            type="email" 
            id="email" 
            name="email" 
            placeholder="user@useremail.com"
            required 
            />
        </div>

        <div className="grid py-2">
          <label className="py-2 text-xl" htmlFor="password">
            Your Password <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            className="border-2 border-slate-200 dark:border-zinc-700 rounded-sm p-2 w-full"
            type="password"
            id="password"
            name="password"
            minLength={8}
            placeholder="xxxxxxxx"
            required
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-6">
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-800 bg-blue-400 hover:bg-blue-600 text-black hover:text-white hover:border-white hover:cursor-pointer text-lg font-medium py-3 px-6 rounded-full transition-colors"
            type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log in'}
          </button>
          <Link className="flex-1 flex items-center justify-center gap-2 border-2 border-stone-800 bg-gray-400 hover:bg-gray-600 text-black hover:text-white hover:border-white text-lg font-medium py-3 px-6 rounded-full transition-colors" 
            href="/">Cancel</Link>
          </div>
      </form>
    </main>
    {/* Footer */}
      <footer className="mt-auto bottom-0 w-full flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 bg-slate-50 text-black dark:text-white dark:bg-gray-800 font-semibold text-xs sm:text-sm z-10 gap-2">
        <span>&#169;2026 Shelfy</span>
          <p>Problems?{" "}
        <a href="mailto:leo.leksell@live.se" className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact us!</a>  
        </p>
      </footer>
    </div>
  );
}
