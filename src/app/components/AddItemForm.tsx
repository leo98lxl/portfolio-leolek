"use client";

import Image from "next/image";
import Link from "next/link";
import useDebounce from "@/app/hooks/useDebounce";
import { SearchResult } from "@/app/types";
import { addItem } from "@/app/account/actions";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

interface OpenLibraryDoc {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
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

    const [selectedBook, setSelectedBook] = useState({
        title: "",
        author: "",
        year: "",
        coverId: "",
    });

    const debouncedQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
    const query = debouncedQuery.trim();

    if (!query) {
        return; 
    }

    const controller = new AbortController();
    let active = true;

    fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=title,author_name,first_publish_year,cover_i,key&limit=10`,
        { signal: controller.signal }
    )
    
    .then((res) => {
        if (!res.ok) throw new Error (`Error ${res.status}`);
        return res.json() as Promise<OpenLibraryResponse>;
    })
    .then((data) => {
        if (!active) return;

        setSearchResults(data.docs.map((doc) => ({
          title: doc.title,
          author_name: doc.author_name ?? [],
          first_publish_year: doc.first_publish_year,
          cover_i: doc.cover_i,
          key: doc.key,
        })));
    })
    .catch((err) => {
        console.error(err);
        if (!active || err.name === "AbortError") {
            return;
        }

        setSearchError(err instanceof Error ? err.message : String(err));
        setSearchResults([]);
    })
    .finally(() => {
        if (active) setIsSearching(false);
    });

    return () => {
        active = false;
        controller.abort();
    };
}, [debouncedQuery]);
    
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (!value.trim()) {
            setSearchResults([]);
            setSearchError(null);
        }

        setSearchResults([]);
        setIsSearching(true);
        setSearchError(null);
    };

    const handleSelect = (result: SearchResult) => {
        setSelectedBook({
            title: result.title,
            author: result.author_name.join(", "),
            year: result.first_publish_year ? String(result.first_publish_year) : "",
            coverId: result.cover_i?.toString() ?? "",
        });

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

            {!isSearching && !searchError && debouncedQuery.trim() && searchResults.length === 0 && (
                <p role="status">No books found.</p>
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
                                {result.cover_i 
                                    ? (
                                    <Image src={`https://covers.openlibrary.org/b/id/${result.cover_i}-S.jpg`} 
                                        alt={`Book cover for ${result.title}`}
                                        width={40}
                                        height={60} 
                                        />
                                    ) : (
                                    <Image
                                        className="dark:invert"
                                        src="/book-dashed.svg"
                                        alt="No book cover available"
                                        width={40}
                                        height={40}
                                    />)}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Book cover display */}
                <input type="hidden" id="cover_i" name="cover_i" value={selectedBook.coverId} readOnly />

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title of book"
                    value={selectedBook.title}
                    onChange={(event) => setSelectedBook({ ...selectedBook, title: event.target.value })}
                    required
                />

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Author of book"
                    value={selectedBook.author}
                    onChange={(event) => setSelectedBook({ ...selectedBook, author: event.target.value })}
                    required
                />

                <label htmlFor="year">Release year</label>
                <input
                    type="number"
                    id="year"
                    name="year"
                    min={1455}
                    max={new Date().getFullYear()}
                    placeholder="YYYY"
                    value={selectedBook.year}
                    onChange={(event) => setSelectedBook({ ...selectedBook, year: event.target.value })}
                />

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
