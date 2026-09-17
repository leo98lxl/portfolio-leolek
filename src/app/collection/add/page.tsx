import AddItemForm from "@/app/components/AddItemForm";
import { Metadata } from "next";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Item - Shelfy",
  description: "Form for adding items to your Shelfy collection",
};

export default async function AddItem() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const {
      data: { user },
    } = await supabase.auth.getUser();
        
    if (!user) {
      redirect('/account/log-in');
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-between bg-white text-black dark:text-white dark:bg-gray-900">
      {/* Main Form Content */}
      <main className="relative my-auto z-10 w-full max-w-2xl px-4 py-6">
          <AddItemForm />
      </main>

      {/* Footer */}
      <footer className="mt-auto bottom-0 w-full flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 bg-slate-50 text-black dark:text-white dark:bg-gray-800 font-semibold text-xs sm:text-sm z-10 gap-2">
        <span>&#169;2026 Shelfy</span>
        <p>
          Problems?{" "}
          <a
            href="mailto:leo.leksell@live.se"
            className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact us!
          </a>
        </p>
      </footer>
      </div>
    )
}
