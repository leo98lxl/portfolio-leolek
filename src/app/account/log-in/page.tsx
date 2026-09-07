'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '../actions';

export default function LogIn() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div>
      <h2>Welcome back!</h2>

      {state?.error && (
        <p style={{ color: 'red' }} role="alert">
          {state.error}
        </p>
      )}

      <form action={formAction}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" placeholder="User email" required />
        </div>

        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={8}
            placeholder="xxxxxxxx"
            required
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log In'}
        </button>
        <Link href="/">Cancel</Link>
      </form>
    </div>
  );
}