import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';
import { logout } from '../account/actions';

export default async function CollectionPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/account/log-in');
  }

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
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <p className="text-lg">Your shelf is currently empty.</p>
          <p className="text-sm mt-1">Items you add will appear here.</p>
        </div>
      </main>
    </div>
  );
}

