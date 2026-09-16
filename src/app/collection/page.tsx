import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createClient } from '../utils/supabase/server';
import { logout } from '../account/actions';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SortByDirection from '../components/SortByDirection';
import SortByOrder from '../components/SortByOrder';
import SortByStatus from '../components/SortByStatus';

export const metadata: Metadata = {
  title: "Your Shelfy - Shelfy",
  description: "Page showing your personal Shelfy collection",
};

type CollectionPageProps = {
  searchParams: Promise<{
    order_by?: string;
    direction?: string;
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

/* NOTE: Runs on the server */
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
  const ascending = params.direction === 'asc';
  const status = validStatuses.includes(params.status as typeof validStatuses[number])
    ? params.status
    : null;

  let itemsQuery = supabase
    .from('media_items')
    .select('id, title, author, year, cover_url, status, rating, review, date_added');

  if (status) {
    itemsQuery = itemsQuery.eq('status', status);
  }

  const { data: items, error } = await itemsQuery.order(orderBy, { ascending });

  const displayName = user.user_metadata?.name || user.email;
  const collectionItems = items ?? [];
  const shelfCapacity = 24;
  const emptySlotCount = Math.max(0, shelfCapacity - collectionItems.length - 1);

  type ShelfSlot =
    | { type: 'item'; item: (typeof collectionItems)[number] }
    | { type: 'add' }
    | { type: 'empty'; id: number };

  const allSlots: ShelfSlot[] = [
    ...collectionItems.map((item) => ({ type: 'item' as const, item })),
    { type: 'add' as const },
    ...Array.from({ length: emptySlotCount }, (_, index) => ({
      type: 'empty' as const,
      id: index,
    })),
  ];

  const itemsPerTier = 8;
  const tiers: ShelfSlot[][] = [];
  for (let i = 0; i < allSlots.length; i += itemsPerTier) {
    tiers.push(allSlots.slice(i, i + itemsPerTier));
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
        <p className="text-red-600 dark:text-red-400 mb-4 font-medium" role="alert">
          We could not load your collection. Please try again.
        </p>
        <Link
          href="/collection"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-stone-800 bg-gray-400 hover:bg-gray-600 text-black hover:text-white hover:border-white hover:cursor-pointer text-lg font-medium py-3 px-6 rounded-full transition-colors"
        >
          Retry
        </Link>
      </div>
    );
  }

  return ( 
    <div className="min-h-screen flex flex-col justify-between bg-white text-black dark:text-white dark:bg-gray-900 font-semibold text-sm z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <header className="flex flex-wrap justify-between items-center gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-zinc-800">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Your Shelfy</h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Logged in as <span className="font-medium text-slate-700 dark:text-zinc-200 truncate inline-block max-w-50 sm:max-w-none align-bottom">{displayName}</span></p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-stone-800 bg-gray-400 hover:bg-gray-600 text-black hover:text-white hover:border-white hover:cursor-pointer text-lg font-medium py-3 px-6 rounded-full transition-colors"
            >
              Log Out
            </button>
          </form>
        </header>

        <main className="mt-8">
          {/* Centered filter & sort toolbar */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              <SortByOrder />
              <SortByStatus />
              <SortByDirection />
          </div>

          {/* Enclosed Bookcase Furniture Unit */}
          <div className="relative mx-auto max-w-5xl mb-12">

            {/* Main Cabinet Frame with detailed stiles and inner shadow */}
            <div className="relative rounded-md border-t-10 border-x-12 sm:border-t-14 sm:border-x-16 border-slate-200 dark:border-zinc-700 ring-1 ring-slate-400/60 dark:ring-zinc-600/70 bg-slate-100/70 dark:bg-zinc-900/60 shadow-2xl overflow-hidden">
              {tiers.map((tier, tierIdx) => (
                <div key={tierIdx} className="relative">
                  {/* Shelf Compartment with standing books and interior wall shadow */}
                  <div className="pt-6 pb-2 px-3 sm:px-6 shadow-[inset_0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_6px_16px_rgba(0,0,0,0.5)] bg-slate-300 dark:bg-gray-800">
                    <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1 sm:gap-2 items-end">
                      {tier.map((slot) => {
                        if (slot.type === 'item') {
                          const item = slot.item;
                          return (
                            <li key={item.id} className="group flex flex-col items-center w-full" tabIndex={0}>
                              {/* Narrow spine with the cover as its color and texture */}
                              <div className="relative mx-auto h-48 w-10 overflow-hidden rounded-r-md rounded-l-xs bg-slate-300 shadow-[3px_6px_12px_rgba(0,0,0,0.18)] transition-all duration-200 group-hover:-translate-y-2 group-hover:shadow-[6px_14px_22px_rgba(0,0,0,0.28)] dark:bg-zinc-800 sm:h-56 sm:w-12">
                                {item.cover_url && (
                                  <Image
                                    src={item.cover_url}
                                    alt=""
                                    width={60}
                                    height={60}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover opacity-65 blur-[1px] scale-105"
                                  />
                                )}

                                <div className="absolute inset-0 bg-black/25" />
                                <div className="absolute inset-y-0 left-0 z-10 w-1.5 bg-linear-to-r from-black/40 via-white/20 to-transparent" />
                                <span className="absolute inset-0 z-10 flex items-center justify-center px-1 text-center text-[10px] sm:text-xs font-semibold leading-tight text-white drop-shadow-md [writing-mode:vertical-rl] [text-orientation:mixed] line-clamp-1 overflow-hidden">
                                  {item.title}
                                </span>

                                {/* Hover Review/Details Overlay */}
                                {item.review && (
                                  <div className="absolute inset-0 bg-black/80 text-white p-3 text-xs opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center text-center backdrop-blur-xs z-20 pointer-events-none">
                                    <p className="italic line-clamp-4">&ldquo;{item.review}&rdquo;</p>
                                    {item.year && (
                                      <span className="text-[10px] text-zinc-400 mt-2">({item.year})</span>
                                    )}
                                  </div>
                                )}

                                {/* Status Badge */}
                                <span
                                  aria-label={item.status === 'read' ? 'Read' : 'Unread'}
                                  className={`absolute right-1.5 top-1.5 z-10 h-2.5 w-2.5 rounded-full shadow-xs ring-1 ring-white/60 ${
                                    item.status === 'read'
                                      ? 'bg-emerald-400'
                                      : 'bg-slate-500'
                                  }`}
                                >
                                  <span className="sr-only">{item.status === 'read' ? 'Read' : 'Unread'}</span>
                                </span>
                              </div>

                              {/* Supporting info under book */}
                              <div className="mt-2 text-center w-full px-1">
                                <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                                  {item.author}
                                </p>
                                <div className="flex items-center justify-center gap-2 mt-0.5">
                                  {item.year && !item.review && (
                                    <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                                      {item.year}
                                    </span>
                                  )}
                                  {item.rating && (
                                    <span className="text-[10px] text-amber-500 font-medium">
                                      ★ {item.rating}/5
                                    </span>
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        }

                        if (slot.type === 'add') {
                          return (
                            <li key="add-slot" className="flex flex-col items-center w-full">
                              <Link
                                href="/collection/add"
                                aria-label="Add item to collection"
                                className="group relative mx-auto flex h-48 w-10 flex-col items-center justify-center overflow-hidden rounded-r-md rounded-l-xs border-2 border-dashed border-slate-400/90 bg-slate-200/70 shadow-xs transition-all duration-150 hover:-translate-y-1 hover:border-solid hover:border-blue-600 hover:bg-blue-400 dark:border-zinc-500 dark:bg-zinc-800/70 dark:hover:border-blue-300 dark:hover:bg-blue-500 sm:h-56 sm:w-12"
                              >
                                <Image
                                  className="opacity-60 dark:invert group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all"
                                  src="/book-plus.svg"
                                  alt="Add book"
                                  width={24}
                                  height={24}
                                />
                                <span className="mt-1 text-[10px] font-bold text-slate-600 transition-colors [writing-mode:vertical-rl] dark:text-zinc-300 group-hover:text-white">
                                  Add Book
                                </span>
                              </Link>
                              {/* Spacer to align with book info below */}
                              <div className="mt-2 h-8" aria-hidden="true" />
                            </li>
                          );
                        }

                        return (
                          <li
                            key={`empty-${slot.id}`}
                            className="flex flex-col items-center w-full"
                            aria-hidden="true"
                          >
                            <div className="mx-auto flex h-48 w-10 items-center justify-center rounded-r-md rounded-l-xs border-2 border-dashed border-slate-300 bg-slate-200/60 shadow-xs dark:border-zinc-600 dark:bg-zinc-800/60 sm:h-56 sm:w-12">
                              <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-zinc-500" />
                            </div>
                            <div className="mt-2 h-8" aria-hidden="true" />
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Horizontal Shelf Plank under each row */}
                  <div className="relative h-3.5 w-full bg-linear-to-b from-slate-200 via-slate-300 to-slate-400 dark:from-zinc-700 dark:via-zinc-700 dark:to-zinc-800 border-t border-white/70 dark:border-zinc-500/40 shadow-[0_3px_6px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                    <div className="absolute -bottom-1 inset-x-0 h-1 bg-slate-400/80 dark:bg-zinc-900/90" />
                  </div>
                </div>
              ))}
              </div>

            {/* Bookcase Legs & Floor Shadow */}
            <div className="relative flex justify-between items-start px-8 sm:px-14 -mt-0.5">
              {/* Left Leg */}
              <div className="w-6 sm:w-8 h-8 sm:h-10 bg-linear-to-b from-slate-300 via-slate-400 to-slate-500 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 rounded-b-md shadow-lg border-x border-b border-slate-400/80 dark:border-zinc-600 flex flex-col justify-between items-center py-1">
                <div className="w-full h-0.5 bg-white/40 dark:bg-zinc-500/40" />
                <div className="w-3/4 h-1 bg-slate-600/30 dark:bg-black/50 rounded-xs" />
              </div>

              {/* Floor Shadow beneath the bookcase */}
              <div className="flex-1 h-3 mt-4 bg-black/20 dark:bg-black/60 blur-xs rounded-full mx-6" />

              {/* Right Leg */}
              <div className="w-6 sm:w-8 h-8 sm:h-10 bg-linear-to-b from-slate-300 via-slate-400 to-slate-500 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 rounded-b-md shadow-lg border-x border-b border-slate-400/80 dark:border-zinc-600 flex flex-col justify-between items-center py-1">
                <div className="w-full h-0.5 bg-white/40 dark:bg-zinc-500/40" />
                <div className="w-3/4 h-1 bg-slate-600/30 dark:bg-black/50 rounded-xs" />
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="mt-auto bottom-0 w-full flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 bg-white text-black dark:text-white dark:bg-gray-800 font-semibold text-xs sm:text-sm z-10 gap-2">
        <span>&#169;2026 Shelfy</span>
          <p>Problems?{" "}
        <a href="mailto:leo.leksell@live.se" className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact us!</a>  
        </p>
      </footer>
    </div>
  );
}

