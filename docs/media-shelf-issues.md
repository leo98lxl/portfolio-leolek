# Media Shelf — GitHub Issue Backlog

Paste each section below in as its own GitHub Issue (title = the `##` heading).
Ordered to match the Week 1 → 3 build plan from `project-overview.md` — earlier
issues unblock later ones, so work top to bottom.

Suggested labels: `week-1` / `week-2` / `week-3`, `mvp`, `stretch`

---

## [Setup] Connect Supabase client & confirm connection

**Milestone:** Week 1 — Foundation
**Depends on:** nothing (do this first)

### Description
Wire the Next.js app up to the Supabase project that's already been created,
and confirm the two can actually talk to each other before building anything
on top.

### Tasks
- [x] Install `@supabase/supabase-js` and `@supabase/ssr` (not the deprecated
      `@supabase/auth-helpers-nextjs`)
- [x] Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to
      `.env.local`, confirm `.env.local` is git-ignored
- [ ] Add a browser Supabase client utility
- [ ] Add a server Supabase client utility (for Server Components/Actions)
- [ ] Run a simple test query (or console log) to confirm the app can reach
      Supabase

### Definition of done
App boots with no Supabase connection errors, and a test query against the
project returns successfully.

---

## [Schema] Create `media_items` table with RLS

**Milestone:** Week 1 — Foundation
**Depends on:** Supabase client setup

### Description
Set up the core data table in the Supabase dashboard, with Row Level
Security from the start (not bolted on later).

### Tasks
- [x] Create `media_items` table: `id`, `user_id`, `title`, `author`, `year`,
      `cover_url`, `status`, `rating`, `review`, `date_added`
- [x] Enable Row Level Security on the table
- [x] Add RLS policy so a user can only read/write rows where `user_id`
      matches their own auth id

### Definition of done
Querying the table as one test user never returns another user's rows, even
when queried directly.

---

## [Auth] Sign-up, log-in, log-out flow

**Milestone:** Week 1 — Foundation
**Depends on:** Supabase client setup

### Description
Core account flow — this is the biggest single blocker for everything else,
and the best Friday target since it stands alone and is clearly demoable.

### User stories
- As a new visitor, I want to create an account so I can start my own collection.
- As a returning user, I want to log in so I can access my existing shelf.
- As a logged-in user, I want to log out so my collection stays private on a shared device.

### Tasks
- [ ] Build sign-up page (email + password form)
- [ ] Build log-in page
- [ ] Wire up Supabase Auth sign-up / sign-in calls
- [ ] Add log-out action
- [ ] Add session check — logged-out users get redirected away from the shelf page
- [ ] Add middleware to refresh the auth session on every request

### Definition of done
Create two separate test accounts. Confirm: can sign up, log in, log out,
sessions persist across a page refresh, and each account only ever lands on
its own (empty) shelf.

---

## [Shelf] Manual add-item form (no API yet)

**Milestone:** Week 2 — Core Shelf Functionality
**Depends on:** Auth flow, `media_items` table

### Description
Build the save-to-database data flow with a plain form before layering the
Open Library search on top — isolates "does saving work" from "does the API
integration work."

### Tasks
- [ ] Build a basic add-item form: title, author, year (plain text fields)
- [ ] Save submitted item to `media_items`, linked to the logged-in user
- [ ] Confirm the item appears on the shelf after adding

### Definition of done
Submitting the form creates a row in Supabase tied to the current user, with
no page reload errors.

---

## [Shelf] Display shelf with sorting

**Milestone:** Week 2 — Core Shelf Functionality
**Depends on:** Manual add-item form

### User stories
- As a new user, I want to see an empty shelf with a clear way to add my first item.
- As a user, I want to sort my shelf by name, year, or date added.

### Tasks
- [ ] Fetch and display all of the logged-in user's items
- [ ] Build empty-slot grid layout (grayscale placeholders per design-notes.md)
- [ ] Filled slots show at minimum: title, cover if available
- [ ] Add sort controls: name / year / date added

### Definition of done
Shelf correctly shows only the current user's items, in grid form, and all
three sort options visibly reorder the items.

---

## [Search] Open Library integration for adding books

**Milestone:** Week 2 — Core Shelf Functionality
**Depends on:** Manual add-item form

### User stories
- As a user, I want to search for a book by title instead of typing all its details manually.
- As a user, I want details (author, year, cover) to auto-fill when I pick a search result.

### Tasks
- [ ] Add search input (search-as-you-type or search button) hitting the
      Open Library API
- [ ] Display results: title, author, cover thumbnail
- [ ] Selecting a result auto-fills the add-item form
- [ ] Saved item includes the cover image URL from Open Library

### Definition of done
Searching a real title, picking a result, and saving produces a
`media_items` row with a working cover image URL.

---

## [Details] Status, rating, and review on an item

**Milestone:** Week 3 — Item Details & Polish
**Depends on:** Shelf display

### User stories
- As a user, I want to mark a book as read to track my progress.
- As a user, I want to rate a book to remember how much I liked it.
- As a user, I want to write a short review to capture my thoughts.
- As a user, I want all of the above optional, so adding an item isn't blocked by them.

### Tasks
- [ ] Add UI to mark item read/unread (status flag)
- [ ] Add rating input (e.g. 1–5 stars)
- [ ] Add review text field
- [ ] Confirm all three are optional at add-time and editable afterward

### Definition of done
An item can be added with none of the three fields set, then edited later to
add each one independently.

---

## [Visual] Welcome page

**Milestone:** Week 3 — Item Details & Polish
**Depends on:** nothing (can be done in parallel, low risk)

### Tasks
- [ ] Background: static, slightly blurry "completed collection" graphic
- [ ] Centered Create Account / Log In actions

### Definition of done
Matches `design-notes.md` welcome page description; both actions route
correctly for a logged-out visitor.

---

## [Visual] Empty-slot hover/tap interaction

**Milestone:** Week 3 — Item Details & Polish
**Depends on:** Shelf display

### Tasks
- [ ] Empty slot highlights on hover (desktop) / tap (mobile)
- [ ] Highlighted slot reveals a plus-sign Add button
- [ ] Add button opens the add-item flow

### Definition of done
Works on both a desktop pointer and a touch-width viewport.

---

## [Visual] Filled-slot color from cover art

**Milestone:** Week 3 — Item Details & Polish
**Depends on:** Search integration, Shelf display

### Description
The grayscale → colorful contrast is called out in design-notes.md as the
core visual hook — worth the polish time, but also the most cuttable item if
the week runs short.

### Tasks
- [ ] Extract dominant color client-side from each book's cover image
- [ ] Apply extracted color to that item's shelf slot
- [ ] Fallback color for items with no cover image

### Definition of done
Adding a book with a cover image visibly colors its shelf slot to roughly
match the cover.

---

## [Polish] Responsive check + empty/loading/error states

**Milestone:** Week 3 — Buffer & wrap-up
**Depends on:** everything else above

### Tasks
- [ ] Shelf and forms usable on a mobile-width screen
- [ ] "No results found" state on search
- [ ] Loading state while fetching search results / shelf data
- [ ] Basic error state (failed save, failed fetch)

### Definition of done
Walking through the full flow (sign up → search → add → rate/review → sort)
on a narrow viewport produces no broken layout or silent failures.

---

## [Stretch] Additional media types, barcode scan, edit/delete, filtering

**Milestone:** Stretch — only after MVP is fully working
**Depends on:** full MVP loop working

Not required for submission. Only pick up if Week 3 finishes early.

### Tasks
- [ ] Movies (TMDB) and/or CDs (MusicBrainz/Discogs) as additional media types
- [ ] Barcode scanning on mobile (camera → ISBN/UPC → auto-add)
- [ ] Edit/delete existing shelf items
- [ ] Filtering by status / rating / media type
