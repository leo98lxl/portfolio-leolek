/* Interface for Open Library search results - "cover_i" fetches cover images via Covers API */

export interface SearchResult {
    title: string;
    author_name: string[];
    first_publish_year?: number;
    cover_i?: number;
    key: string;
};
