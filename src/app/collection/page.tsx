import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';
import { logout } from '../account/actions';
import Link from 'next/link';

export default async function CollectionPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/account/log-in');
  }

  const { data: items, error } = await supabase
    .from('media_items')
    .select('id, title, author, year, status, rating, review, date_added')
    .order('date_added', { ascending: false });

  const displayName = user.user_metadata?.name || user.email;

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold">Media Shelf</h1>
          <p className="text-sm text-gray-600">Logged in as {displayName}</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-colors text-sm font-medium"
          >
            Log Out
          </button>
        </form>
      </header>

      <main className="mt-8">
        {error ? (
          <p className="text-red-600" role="alert">
            We could not load your collection. Please try again.
          </p>
        ) : items.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p className="text-lg">Your shelf is currently empty.</p>
            <p className="text-sm mt-1">Items you add will appear here.</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className="border border-gray-200 rounded-lg p-4">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.author}</p>
                {item.year && <p className="text-sm text-gray-600">{item.year}</p>}
                <p className="text-sm mt-2">{item.status === 'read' ? 'Read' : 'Unread'}</p>
                {item.rating && <p className="text-sm">Rating: {item.rating}/5</p>}
                {item.review && <p className="text-sm mt-2">{item.review}</p>}
              </li>
            ))}
          </ul>
        )}

        <Link className="ml-4" href="/collection/add">Add item</Link>
      </main>
    </div>
  );
}

