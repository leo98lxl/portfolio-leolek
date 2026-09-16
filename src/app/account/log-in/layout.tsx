import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In - Shelfy",
  description: "Log in to your Shelfy account",
};

export default function LogInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

