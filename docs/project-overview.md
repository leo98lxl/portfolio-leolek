# Project Overview — Media Shelf

## What it is
A Next.js web app where users create an account and build a personal, visual
collection of their physical media (books, movies, CDs). Items are added by
searching an external API, optionally tracked as watched/read/played, rated,
and reviewed. The collection is displayed as a "shelf" that visually fills in
as items are added.

## Why this project
Portfolio piece for the frontend development course. Goal is to demonstrate
full-stack ability: authentication, a database, CRUD operations, external API
integration, and a polished, non-generic UI — not just a tutorial clone.

## Timeline
- **Deadline:** 3 weeks from Sept 2, 2026
- **Scope strategy:** ship one media type fully functional first (MVP), treat
  the other two media types and barcode scanning as stretch goals if time
  allows.

## Tech stack (decided)
- Framework: Next.js
- Auth: Supabase Auth
- Database: Supabase (hosted Postgres)
- External data source (MVP media type — books): Open Library API
- Styling: TBD
- Deployment: none required — runs on localhost for course submission/demo

## MVP media type
Books — chosen as the starting point because book-lookup APIs (e.g. Open
Library) tend to be the most consistent and beginner-friendly of the three
media types to integrate.

## Suggested build order
1. Week 1 — auth, data model, empty shelf state, manual "add item" form
   (no external API yet), full CRUD loop working end to end.
2. Week 2 — wire in search-based adding via the books API; sorting; rating/
   review/status fields.
3. Week 3 — polish: responsive design, empty/loading/error states, and only
   if time allows, additional media types and/or barcode scanning.

See `mvp-checklist.md` for the detailed, step-by-step task breakdown used
for day-to-day tracking.
