# Shelfy work checklist

This is the working document for the remaining sprint. The goal is to finish the app cleanly before the Friday deadline without taking on new features.

## Working rules
- Keep work scoped to quality, stability, and visual polish.
- No new features until after the main app is stable.
- Leave time for debugging and browser testing.
- Stop and test after each fix instead of stacking multiple visual changes at once.

## Priority order

### P0 — Must do before deadline
- [X] Fix the footer overlap on the welcome, log-in, sign-up, and collection pages
- [X] Replace invalid Tailwind width classes such as w-fill with w-full
- [X] Check the app at mobile widths: 320px, 375px, and 768px
- [X] Test the full add-book flow and shelf layout after each UI change
- [X] Fix any broken spacing or overflow found during testing

### P1 — Important polish, still manageable today
- [X] Normalize button styling across the app
- [X] Improve spacing and balance on the auth forms
- [X] Add clear focus states for buttons and inputs
- [X] Reduce title/author overflow on shelf items at smaller widths
- [X] Keep the page layout visually consistent from sign-up to shelf display

### P2 — Optional if time remains
- [ ] Add a small cover-color accent to filled shelf slots
- [ ] Improve subtle shelf depth and shadow styling
- [ ] Refine hover states for the add-book slot and CTA buttons

---

## Today’s task breakdown

### 1) Layout and responsive stability
- [ ] Check all pages use a balanced min-height layout
- [ ] Ensure the footer sits at the bottom rather than covering content
- [ ] Confirm the shelf still looks usable on narrow screens
- [ ] Test text wrapping, button overflow, and spacing issues

### 2) Small CSS and form fixes
- [ ] Replace w-fill with w-full where needed
- [ ] Check input and button widths on mobile
- [ ] Confirm labels and buttons stay aligned on all auth pages
- [ ] Remove any obvious visual inconsistencies in forms

### 3) Visual polish pass
- [ ] Make the CTA buttons look consistent across pages
- [ ] Make the add-book button and shelf cards feel more intentional
- [ ] Improve spacing and shadows in a restrained, consistent way
- [ ] Keep all changes small and easy to test

### 4) Debugging and QA pass
- [ ] Run the app locally and test the full sign-up/login flow
- [ ] Add a book and confirm it appears in the shelf
- [ ] Check sorting and layout after adding multiple items
- [ ] Test at least one mobile viewport and one desktop viewport
- [ ] Fix only the issues that affect usability or visual quality

---

## MVP checklist status

### Foundation & accounts
- [X] Create Next.js app
- [X] Create Supabase project and configure environment keys
- [X] Connect the app to Supabase
- [X] Build sign-up page
- [X] Build log-in page
- [X] Wire up auth sign-up and sign-in actions
- [X] Add log-out flow
- [X] Add session guard for logged-out users

### Core shelf functionality
- [X] Manual add-item flow for title, author, and year
- [X] Save items to Supabase and attach them to the current user
- [X] Display the user’s shelf
- [X] Build empty-slot grid layout
- [X] Show item info for filled slots
- [X] Add sorting controls
- [X] Add Open Library search integration
- [X] Autofill selected search result into the form
- [X] Save cover image URLs from Open Library

### Item details and polish
- [X] Add read/unread status controls
- [X] Add rating input
- [X] Add review field
- [X] Confirm optional fields are supported
- [X] Welcome page background and centered CTA layout
- [X] Empty-slot hover/tap highlight and add button
- [ ] Filled slot color reflects the cover image color
- [ ] Responsive check: shelf and forms work on mobile-width screens

### Buffer & wrap-up
- [ ] Fix issues discovered during end-to-end testing
- [ ] Confirm no critical layout breakages on mobile
- [ ] Leave room for debugging and final verification before the deadline

---

## Stretch items — not for this sprint
- [ ] Additional media types
- [ ] Barcode scanning on mobile
- [ ] Edit/delete existing items
- [ ] Filtering by status or rating
- [ ] Create a sorting reset button

---

## End-of-day sign-off
Before stopping today, confirm all of the following:
- [ ] The app builds successfully
- [ ] The sign-up/login flow works
- [ ] A book can be added and shown on the shelf
- [ ] The page still looks solid on a mobile viewport
- [ ] No critical layout regressions remain
- [ ] You have buffer time left for debugging and final QA

If a task takes longer than 30–45 minutes without a clear fix, stop, document the issue, and move to the next highest-priority item.
