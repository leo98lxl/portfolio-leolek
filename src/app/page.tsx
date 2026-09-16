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
      <main className="relative z-10 bg-white border-4 border-black dark:bg-gray-800 dark:border-white p-12 rounded-xl shadow-2xl flex flex-col items-center text-center max-w-lg w-full mx-4">
        <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">
          Welcome to Shelfy!
        </h1>
        <p className="text-xl text-gray-800 mb-10 dark:text-white">
          The best place to store your collection digitally!
        </p>

        <div className="flex flex-col gap-5 w-full px-10">
          <Link
            href="/account/sign-up"
            className="flex items-center justify-center gap-2 border-2 border-indigo-800 bg-blue-400 hover:bg-blue-600 text-black hover:text-white hover:border-white text-lg font-medium py-4 px-8 rounded-full transition-colors"
          >
            Join us!
          </Link>
          <Link
            href="/account/log-in"
            className="flex items-center justify-center gap-2 border-2 border-stone-800 bg-gray-400 hover:bg-gray-600 text-black hover:text-white hover:border-white text-lg font-medium py-4 px-8 rounded-full transition-colors"
          >
            Log in
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full flex justify-between px-6 py-3 bg-white text-black dark:text-white dark:bg-gray-800 font-semibold text-sm z-10">
        <span>&#169;2026 Shelfy</span>
          <p>Problems?{" "}
        <a href="mailto:leo.leksell@live.se" className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact us!</a>  
        </p>
      </footer>
    </div>
  );
}
