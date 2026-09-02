# Features

*This is the high-level feature reference. For the detailed, step-by-step
build order, see `mvp-checklist.md`.*

## MVP (must-have, weeks 1–3)

### Accounts (via Supabase Auth)
- [ ] User can create an account
- [ ] User can log in / log out
- [ ] User sees their own shelf only (no cross-account data leakage)

### Shelf
- [ ] New user sees an empty shelf with a clear call-to-action to add an item
- [ ] Shelf displays all added items
- [ ] Shelf can be sorted by: name, year, date added

### Adding an item (MVP media type: books)
- [ ] User can search for a title via the external API
- [ ] Selecting a search result auto-fills item info (title, author, year,
      cover image, etc.)
- [ ] Item is saved to the user's shelf

### Item details
- [ ] User can mark an item as watched/read/played (status flag)
- [ ] User can give a rating
- [ ] User can write a review
- [ ] All of the above are optional at time of adding — can be edited later

### Visual design
- [ ] Welcome page with background collection graphic + centered
      Create Account / Log In actions
- [ ] Empty shelf shown as a grayscale/colorless graphic
- [ ] Shelf becomes colorful as items are added

## Stretch goals (only after MVP is fully working)
- [ ] Additional media types (movies, CDs) with their own API integrations
- [ ] Barcode scanning on mobile (camera → ISBN/UPC lookup → auto-add)
- [ ] Edit/delete existing shelf items
- [ ] Filtering (by status, rating, media type)
- [ ] Public/shareable shelf view

## Explicitly out of scope for this project
- [ ] Social features (following other users, comments)
- [ ] Recommendations engine
