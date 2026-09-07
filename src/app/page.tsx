import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="/dvd-movie-collection-studio-shot-21822003.jpg"
          alt="Blurry background image showing completed collection"
          fill
          className="object-cover blur-sm opacity-80 scale-105"
          priority
        />
      </div>

      {/* Main Content Card */}
      <main className="relative z-10 bg-white p-12 rounded-xl shadow-2xl flex flex-col items-center text-center max-w-lg w-full mx-4">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Welcome to Media Shelf!
        </h1>
        <p className="text-xl text-gray-800 mb-10">
          The best place to store your collection digitally!
        </p>

        <div className="flex flex-col gap-5 w-full px-10">
          <Link
            href="/account/sign-up"
            className="flex items-center justify-center gap-2 bg-[#b5b5b5] hover:bg-gray-400 text-black text-lg font-medium py-4 px-8 rounded-full transition-colors"
          >
            Join us!
          </Link>
          <Link
            href="/account/log-in"
            className="bg-[#e3e0dd] hover:bg-gray-300 text-black text-lg font-medium py-4 px-8 rounded-full transition-colors"
          >
            Log in
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full flex justify-between px-6 py-3 bg-white text-black font-semibold text-sm z-10">
        <span>(C)2026 Media Shelf</span>
        <Link href="/contact" className="hover:underline">
          Problems? Contact us!
        </Link>
      </footer>
    </div>
  );
}
