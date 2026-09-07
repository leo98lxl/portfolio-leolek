'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '../actions';

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <div>
      <h2>Welcome!</h2>
      <p>Please fill in the required fields to create your Media Shelf account.</p>

      {state?.error && (
        <p style={{ color: 'red' }} role="alert">
          {state.error}
        </p>
      )}

      {state?.message && (
        <p style={{ color: 'green' }} role="status">
          {state.message}
        </p>
      )}

      <form action={formAction}>
        <div>
          <label htmlFor="name">Your Name (optional)</label>
          <input type="text" id="name" name="name" placeholder="User name" />
        </div>

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

        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            minLength={8}
            placeholder="xxxxxxxx"
            required
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Creating Account...' : 'Create Account'}
        </button>
        <Link href="/">Cancel</Link>
      </form>
    </div>
  );
}