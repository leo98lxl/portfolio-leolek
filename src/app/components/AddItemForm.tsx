"use client";

import Link from "next/link";
import { addItem } from "@/app/account/actions";
import { useActionState } from "react";

export default function AddItemForm() {
    const [state, formAction, isPending] = useActionState(addItem, null);

    return (
        <div>
            {state?.error && (
                <p style={{ color: 'red' }} role="alert">
                    {state.error}
                </p>
            )}

            <form action={formAction}>
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" placeholder="Search for title, author, year..." autoFocus />

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Title of book" required />

                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" placeholder="Author of book" required />

                <label htmlFor="year">Release year</label>
                <input type="number" id="year" name="year" min={1900} max={2026} placeholder="YYYY" />

                <fieldset>
                    <legend>Status (Optional)</legend>
                    <div>
                        <input type="checkbox" id="status" name="status" />
                        <label htmlFor="status">I have read this book</label>
                    </div>
                </fieldset>

                <label htmlFor="rating">Your rating (Optional)</label>
                <input type="number" id="rating" name="rating" min={1} max={5} />

                <label htmlFor="review">Review (Optional)</label>
                <textarea id="review" name="review" minLength={0} maxLength={200} placeholder="Write a review (up to 200 characters)">
                </textarea>

                <button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add to Collection"}</button>
                <Link href="/collection">Cancel</Link>
            </form>
        </div>
    )
}