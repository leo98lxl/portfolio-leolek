import { cookies } from 'next/headers';
import { createClient } from '../utils/supabase/server';
import { logout } from '../account/actions';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SortByDirection from '../components/SortByDirection';
import SortByOrder from '../components/SortByOrder';
import SortByStatus from '../components/SortByStatus';

type CollectionPageProps = {
  searchParams: Promise<{
    order_by?: string;
    sort?: string;
    status?: string;
  }>;
};

const sortableFields = [
  'title',
  'author',
  'year',
  'date_added',
  'status',
  'rating',
  'review',
] as const;
const validStatuses = ['read', 'unread'] as const;

export default async function CollectionPage(
  {searchParams,}: CollectionPageProps) {

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const params = await searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/account/log-in');
  }

  const orderBy = sortableFields.includes(params.order_by as typeof sortableFields[number])
    ? params.order_by as typeof sortableFields[number]
    : 'date_added';
  const ascending = params.sort === 'asc';
  const status = validStatuses.includes(params.status as typeof validStatuses[number])
    ? params.status
    : null;

  let itemsQuery = supabase
    .from('media_items')
    .select('id, title, author, year, status, rating, review, date_added');

  if (status) {
    itemsQuery = itemsQuery.eq('status', status);
  }

  const { data: items, error } = await itemsQuery.order(orderBy, { ascending });

  const displayName = user.user_metadata?.name || user.email;
  const collectionItems = items ?? [];
  const shelfCapacity = 18;
  const emptySlotCount = Math.max(0, shelfCapacity - collectionItems.length - 1);

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold">Your Media Shelf</h1>
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
        <div>
          <SortByOrder />
          <SortByStatus />
          <SortByDirection />
        </div>

        {error ? (
          <p className="text-red-600" role="alert">
            We could not load your collection. Please try again.
          </p>
        ) : (
          <ul className="grid gap-y-4 sm:grid-cols-6 grid-rows-3 border-4 border-gray-300">
            {collectionItems.map((item) => (
              <li key={item.id} className="min-h-40 border border-gray-200 p-4">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.author}</p>
                {item.year && <p className="text-sm text-gray-600">{item.year}</p>}
                <p className="text-sm mt-2">{item.status === 'read' ? 'Read' : 'Unread'}</p>
                {item.rating && <p className="text-sm">Rating: {item.rating}/5</p>}
                {item.review && <p className="text-sm mt-2">{item.review}</p>}
              </li>
            ))}
            <li className="min-h-40 border border-dashed border-gray-300 hover:bg-blue-400">
              <Link
                className="flex h-full min-h-40 w-full items-center justify-center p-4"
                href="/collection/add"
                aria-label="Add item to collection"
              >
              <Image
                className="dark:invert"
                src="/plus.svg"
                alt="Plus sign for adding items"
                width={80}
                height={80}
              />
              </Link>
            </li>
            {Array.from({ length: emptySlotCount }, (_, index) => (
              <li
                key={`empty-slot-${index}`}
                className="min-h-40 border border-dashed border-gray-200"
                aria-hidden="true"
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

