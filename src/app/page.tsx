import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="/IMG_4446.jpg"
          alt="Blurry background image showing completed collection"
          fill
          className="object-cover blur-sm opacity-80 scale-105"
          priority
        />
      </div>

      {/* Main Content Card */}
      <main className="relative my-auto z-10 grid border-3 border-slate-200 dark:border-zinc-700 bg-white dark:bg-gray-800 shadow-2xl rounded-xl w-[calc(100%-2rem)] max-w-md px-5 sm:px-8 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black dark:text-white text-center">
          Welcome to Shelfy!
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 mb-6 sm:mb-8 dark:text-white text-center">
          The best place to store your personal book collection!
        </p>

        {/* Screenshot Container with Subtle Glow */}
        <div className="relative w-full my-4 flex justify-center items-center">
          {/* Subtle soft backdrop glow behind the screenshot */}
          <div className="absolute inset-1 bg-slate-900/20 dark:bg-black/50 blur-lg rounded-2xl -z-10" />

          {/* Screenshot */}
          <Image
            src="/screenshot-shelf.png"
            alt="Example image showing Shelfy layout"
            width={1280}
            height={720}
            className="w-full h-auto object-cover rounded-xl shadow-md"
            priority
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md px-4 mt-4">
          <Link
            href="/account/sign-up"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-800 bg-blue-400 hover:bg-blue-600 text-black hover:text-white hover:border-white text-lg font-medium py-3 px-6 rounded-full transition-colors"
          >
            Join us!
          </Link>
          <Link
            href="/account/log-in"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-stone-800 bg-gray-400 hover:bg-gray-600 text-black hover:text-white hover:border-white text-lg font-medium py-3 px-6 rounded-full transition-colors"
          >
            Log in
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bottom-0 w-full flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 bg-white text-black dark:text-white dark:bg-gray-800 font-semibold text-xs sm:text-sm z-10 gap-2">
        <span>&#169;2026 Shelfy</span>
          <p>Problems?{" "}
        <a href="mailto:leo.leksell@live.se" className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact us!</a>  
        </p>
      </footer>
    </div>
  );
}
