import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Image
          src="/next.svg"
          alt="Blurry background image showing completed collection"
          width={100}
          height={20}
          priority
        />
        <section>
          <h1>
            Welcome to Media Shelf!
          </h1>
          <p>
            The best place to store your collection digitally!
          </p>
        </section>
        <section>
          <a href="#">
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Join us!
          </a>
          <a href="#">
            Log in
          </a>
        </section>
      </main>
    </div>
  );
}
