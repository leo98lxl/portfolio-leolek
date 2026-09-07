import Link from "next/link";

export default function AddItem() {
    return (
        <div>
            <h2>Add to Collection</h2>
            <p>Use the search field to look for a book. A successful match fills in all the required info fields for you.</p>

            <form action="">
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" placeholder="Search for title, author, year..." autoFocus />

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Title of book" />

                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" placeholder="Author of book" />

                <label htmlFor="date">Release date</label>
                <input type="date" id="date" name="date" placeholder="Release date" />

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

                <button type="submit">Add to Collection</button>
                <Link href="/collection">Cancel</Link>
            </form>
        </div>
    )
}