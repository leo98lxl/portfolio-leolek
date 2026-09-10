"use client";

import Link from "next/link";
import useDebounce from "@/app/hooks/useDebounce";
import { SearchResult } from "@/app/types";
import { addItem } from "@/app/account/actions";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

interface OpenLibraryDoc {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    key: string;
}

interface OpenLibraryResponse {
    docs: OpenLibraryDoc[];
}

export default function AddItemForm() {
    const [state, formAction, isPending] = useActionState(addItem, null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const debouncedQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
    if (!debouncedQuery) {
        setSearchResults([]);
        return;
    }

    setIsSearching(true);
    setSearchError(null);

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(debouncedQuery)}&fields=title,author_name,first_publish_year,key&limit=10`)
    
    .then((res) => {
        if (!res.ok) throw new Error (`Error ${res.status}`);
        return res.json() as Promise<OpenLibraryResponse>;
    })
    .then((data) => {
        const results: SearchResult[] = data.docs.map((doc) => ({
          title: doc.title,
          author_name: doc.author_name ?? [],
          first_publish_year: doc.first_publish_year,
          key: doc.key,
        }));
        setSearchResults(results);
    })
    .catch((err) => {
        console.error(err);
        setSearchError(err instanceof Error ? err.message : String(err));
        setSearchResults([]);
    })
    .finally(() => setIsSearching(false));
    }, [debouncedQuery]);
    
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(e.target.value);

    const handleSelect = (result: SearchResult) => {
        const inputTitle = document.getElementById("title") as HTMLInputElement;
        const inputAuthor = document.getElementById("author") as HTMLInputElement;
        const inputYear = document.getElementById("year") as HTMLInputElement;

        if (inputTitle) inputTitle.value = result.title;
        if (inputAuthor) inputAuthor.value = result.author_name.join(", ");
        if (inputYear && result.first_publish_year) {
            inputYear.value = String(result.first_publish_year);
        }
        setSearchResults([]);
        setSearchQuery(result.title);
    };

    return (
        <div>
            {state?.error && (
                <p style={{ color: "red" }} role="alert">
                    {state.error}
                </p>
            )}

            <form action={formAction}>
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" placeholder="Search for title, author, year..." autoFocus
                value={searchQuery} onChange={handleSearchChange} />

                {isSearching && <p>Searching...</p>}
                {searchError && <p style={{ color: "red" }}>{searchError}</p>}

                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.key} onClick={() => handleSelect(result)}>
                                {result.title}
                                {result.author_name.length ? ` - ${result.author_name.join(", ")}` : ""}
                                {result.first_publish_year ? ` (${result.first_publish_year})` : ""}
                            </li>
                        ))}
                    </ul>
                )}

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Title of book" required />

                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" placeholder="Author of book" required />

                <label htmlFor="year">Release year</label>
                <input type="number" id="year" name="year" min={1900} max={new Date().getFullYear()} placeholder="YYYY" />

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

                <button type="submit" aria-disabled={isPending}>{isPending ? "Adding..." : "Add to Collection"}</button>
                <Link className="ml-4" href="/collection">Cancel</Link>
            </form>
        </div>
    )
}
