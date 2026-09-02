# Design Notes

## Welcome page
- Background: a nice, slightly blurry image/graphic of a completed
  collection (can be a static asset — no real user data needed here since
  the page is unauthenticated).
- Center of page: Create Account and Log In actions, clearly primary.
- Keep it simple for MVP — this page's job is just to explain the concept
  and get the user into an account.

## Shelf — empty state
- Rendered as a grayscale/colorless graphic (e.g. an illustrated shelf with
  empty/placeholder slots).
- Consider showing this as individual empty "slots" rather than one flat
  graphic, so it visually reads as a collection that's meant to be filled
  in — sets up the payoff when items are added.
- Each empty slot highlights on hover (desktop) or tap (mobile), revealing
  a plus-sign "Add" button — makes the empty state self-explanatory as an
  interactive affordance rather than just decoration.

## Shelf — empty slot interaction
- On hover (desktop) or tap (mobile), an empty slot highlights and reveals
  an Add button (plus sign) to add an item directly into that slot.

## Shelf — populated state
- Each added item appears as a colorful book/media icon or cover in its
  slot on the shelf.
- The color used for a filled slot should reflect the actual media's color
  rather than a generic accent color — e.g. a book's cover color, or blue
  for a Blu-ray case.
  - For books (MVP media type): derive the color from the cover image
    (e.g. client-side dominant-color extraction from the cover art).
  - For future media types: a fixed color lookup by media type/format
    (e.g. Blu-ray = blue) may be simpler than image-based extraction.
- The contrast between the grayscale baseline and the colored items already
  added is the core visual hook of the app — worth spending polish time on.

## Open questions to settle before/while building
- Exact visual style of the shelf (illustrated icons vs. real cover art vs.
  a hybrid — e.g. colored generic icon until a cover image loads)
- Mobile layout for the shelf (grid vs. scrollable rows)
- What the "add item" flow looks like as a UI pattern (modal, dedicated
  page, slide-over panel)
