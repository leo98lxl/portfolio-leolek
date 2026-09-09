# Detailed MVP List

Ordered so each step builds on the last. Check items off as you go — if
you're running out of time, anything below the "Week 3" line can slip to
stretch goals without breaking the core app.

## Week 1 — Foundation & Accounts

### Project setup
- [X] Create Next.js app
- [X] Create Supabase project (dashboard, get API URL + anon key)
- [X] Add Supabase client to the project, store keys in `.env.local`
- [X] Confirm the app can connect to Supabase (simple test query or console log)

### Database schema (in Supabase dashboard)
- [X] Create `media_items` table with columns: id, user_id, title, author,
      year, cover_url, status (unread/read etc.), rating, review,
      date_added
- [X] Enable Row Level Security (RLS) so users can only read/write their own
      rows — Supabase-specific and important to set up early, not bolted on
      later

### Accounts (Supabase Auth)
- [X] Build sign-up page (email + password form)
- [X] Build log-in page
- [X] Wire up Supabase Auth sign-up / sign-in calls
- [X] Add log-out action
- [X] Add session check so logged-out users can't see the shelf page
      (redirect to welcome/login)
- [X] Test: create two separate test accounts, confirm each only ever sees
      its own (empty) shelf

**End of Week 1 checkpoint:** you can sign up, log in, log out, and land on
an empty shelf page tied to your account. No media items yet — that's fine.

## Week 2 — Core Shelf Functionality

### Manual add (build the data flow before the API search)
- [X] Build a basic "add item" form with plain text fields (title, author,
      year) — no API yet
- [X] Save submitted item to Supabase, linked to the logged-in user
- [X] Confirm it appears on the shelf after adding

### Shelf display
- [X] Fetch and display all of the logged-in user's items on the shelf
- [x] Build the empty-slot grid layout (grayscale placeholders)
- [X] Filled slots show item info at minimum (title, cover if available)
- [X] Sorting controls: by name, by year, by date added

### Open Library search integration
- [ ] Replace/extend the manual form with a search-as-you-type or search
      button hitting the Open Library API
- [ ] Display search results (title, author, cover thumbnail) for the user
      to pick from
- [ ] Selecting a result auto-fills the add-item form
- [ ] Saved item includes the cover image URL from Open Library

**End of Week 2 checkpoint:** full loop works — search a book, add it, see
it appear correctly on your shelf, sort the shelf. This is your functional
core.

## Week 3 — Item Details, Visual Polish, Buffer

### Item details
- [ ] Add UI to mark an item as read/unread (or your chosen status labels)
- [ ] Add rating input (e.g. 1–5 stars) on an item
- [ ] Add review text field on an item
- [ ] Confirm all three are optional and editable after the item was added

### Visual polish
- [ ] Welcome page: background graphic + centered Create Account/Log In
- [ ] Empty slot hover/tap highlight + plus-sign Add button
- [ ] Filled slot color reflects the book cover's actual color (dominant
      color extraction from cover image)
- [ ] Responsive check: shelf and forms work on a mobile-width screen

### Buffer & wrap-up
- [ ] Fix bugs found while testing the full flow end to end
- [ ] Basic empty/loading/error states (e.g. "no results found" on search,
      loading spinner while fetching)
- [ ] Leave 2–3 days unscheduled as buffer before the deadline

**End of Week 3 checkpoint:** a fully working, polished MVP — this is what
gets submitted/demoed.

## If time remains (stretch, not required)
- [ ] Additional media types (movies via TMDB, CDs via MusicBrainz/Discogs)
- [ ] Barcode scanning on mobile
- [ ] Edit/delete existing items
- [ ] Filtering by status/rating/media type
- [ ] Create sorting reset button: same pattern like the sorting components but use params.delete instead
