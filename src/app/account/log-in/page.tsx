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
      <main className="relative z-10 grid border-4 border-black dark:border-white bg-white dark:bg-gray-800 shadow-2xl rounded-xl w-full max-w-md mx-4 px-8 py-4">
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
          <label className="py-2 text-xl" htmlFor="email">
            Your Email <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input 
            className="border-2 rounded-sm p-2 w-fill" 
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
            className="border-2 rounded-sm p-2 w-fill"
            type="password"
            id="password"
            name="password"
            minLength={8}
            placeholder="xxxxxxxx"
            required
          />
        </div>
        
        <div className="flex justify-center gap-6 pt-6">
          <button className="border-2 border-indigo-800 bg-blue-400 hover:bg-blue-600 text-black hover:text-white hover:border-white rounded-lg text-lg px-6 w-fit min-w-35 hover:cursor-pointer transition-colors"
            type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log in'}
          </button>
          <Link className="border-2 border-red-800 bg-red-400 text-black hover:text-white hover:border-white rounded-lg text-lg px-6 w-fit hover:cursor-pointer hover:bg-red-800 transition-colors text-center" 
            href="/">Cancel</Link>
          </div>
      </form>
    </main>
    {/* Footer */}
      <footer className="absolute bottom-0 w-full flex justify-between px-6 py-3 bg-white text-black dark:text-white dark:bg-gray-800 font-semibold text-sm z-10">
        <span>&#169;2026 Shelfy</span>
          <p>Problems?{" "}
        <a href="mailto:leo.leksell@live.se" className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact us!</a>  
        </p>
      </footer>
    </div>
  );
}
