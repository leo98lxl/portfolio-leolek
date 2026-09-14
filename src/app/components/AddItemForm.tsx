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
    const [rating, setRating] = useState(0);

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
        <div className="grid border-4 border-amber-50 rounded-xl min-w-xs max-w-[1920px] m-4 px-8 py-4">
            <div className="py-2 text-center">
                <h2 className="text-3xl py-4">Add to Collection</h2>
                <p>Use the search field to look for a book. A successful match fills in all the required info fields for you.</p>
            </div>

            {state?.error && (
                <p style={{ color: "red" }} role="alert">
                    {state.error}
                </p>
            )}

            {!isSearching && !searchError && debouncedQuery.trim() && searchResults.length === 0 && (
                <p role="status">No books found.</p>
            )}

            <form className="grid py-2" action={formAction}>
                <div className="relative flex flex-col">
                    <label className="py-2 text-xl" htmlFor="search">Search</label>
                    <input className="border-2 rounded-sm p-2 w-full" 
                        type="text" 
                        id="search" 
                        name="search" 
                        placeholder="Search for title, author, year..." 
                        autoFocus
                        value={searchQuery} onChange={handleSearchChange} 
                    />

                    {isSearching && <p>Searching...</p>}
                    {searchError && <p className="text-red-800">{searchError}</p>}

                    {searchResults.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 z-20 mt-0.5 bg-white dark:bg-zinc-900 border-2 border-black dark:border-white shadow-xl max-h-64 overflow-y-auto divide-y divide-gray-200">
                            {searchResults.map((result) => (
                                <li 
                                    className="flex items-center justify-between uppercase p-2 cursor-pointer hover:bg-blue-400 transition-colors"
                                    key={result.key} 
                                    onClick={() => handleSelect(result)}>
                                    
                                    <span className="truncate">
                                        {result.title}
                                        {result.author_name.length ? ` - ${result.author_name.join(", ")}` : ""}
                                        {result.first_publish_year ? ` (${result.first_publish_year})` : ""}
                                    </span>
                                    {result.cover_i 
                                        ? (
                                        <Image src={`https://covers.openlibrary.org/b/id/${result.cover_i}-S.jpg`} 
                                            alt={`Book cover for ${result.title}`}
                                            className="ml-2 shrink-0 object-cover"
                                            width={24}
                                            height={36} 
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
                </div>

                {/* Book cover display */}
                <input type="hidden" id="cover_i" name="cover_i" value={selectedBook.coverId} readOnly />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        
                        <label className="py-2 text-xl" htmlFor="title">Title</label>
                        <input className="border-2 rounded-sm px-2 w-fit"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title of book"
                            value={selectedBook.title}
                            onChange={(event) => setSelectedBook({ ...selectedBook, title: event.target.value })}
                            required
                            />
                    </div>

                    <div className="flex flex-col">
                        <label className="py-2 text-xl" htmlFor="author">Author</label>
                        <input className="border-2 rounded-sm px-2 w-fit"
                            type="text"
                            id="author"
                            name="author"
                            placeholder="Author of book"
                            value={selectedBook.author}
                            onChange={(event) => setSelectedBook({ ...selectedBook, author: event.target.value })}
                            required
                            />
                    </div>

                    <div className="flex flex-col">
                        <label className="py-2 text-xl" htmlFor="year">Release year</label>
                        <input className="border-2 rounded-sm px-2 w-fit"
                            type="number"
                            id="year"
                            name="year"
                            min={1455}
                            max={new Date().getFullYear()}
                            placeholder="YYYY"
                            value={selectedBook.year}
                            onChange={(event) => setSelectedBook({ ...selectedBook, year: event.target.value })}
                            />
                        </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-2">
                    <fieldset>
                        <legend className="py-2 text-xl">Status (Optional)</legend>
                        <div className="flex items-center gap-3 pt-1">
                            <label htmlFor="status">I have read this book:</label>
                            <input className="w-5 h-5 cursor-pointer" type="checkbox" id="status" name="status" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="py-2 text-xl">Your rating (Optional)</legend>

                        <div className="flex gap-1 pt-1" role="radiogroup" aria-label="Your rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} className="hover:cursor-pointer">
                                <input 
                                    className="sr-only" 
                                    type="radio"
                                    name="rating" 
                                    value={star}
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                    />
                                <svg
                                    className={`h-7.5 w-7.5 ${
                                        rating >= star ? "fill-amber-300" : "fill-transparent"
                                    } stroke-amber-300`}
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                <path
                                     d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                                     strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                 />
                                </svg>

                                <span className="sr-only">
                                    {star} {star === 1 ? "star" : "stars"}
                                </span>
                            </label>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <label className="py-2 text-xl" htmlFor="review">Review (Optional)</label>
                <textarea className="col-span-full border-2 rounded-sm px-2" id="review" name="review" minLength={0} maxLength={200} 
                    placeholder="Write a review (up to 200 characters)">
                </textarea>
                
                <div className="flex justify-center gap-6 pt-6">
                    <button className="border-3 border-black dark:border-white rounded-lg text-xl px-6 w-fit hover:cursor-pointer hover:bg-blue-400 transition-colors" 
                        type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add to Collection"}
                    </button>
                    <Link className="border-3 border-black dark:border-white rounded-lg text-xl px-6 w-fit hover:cursor-pointer hover:bg-red-800 transition-colors text-center" 
                        href="/collection">Cancel
                    </Link>
                </div>

            </form>
        </div>
    )
}
