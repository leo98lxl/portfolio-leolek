import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - Shelfy",
  description: "Create a new Shelfy account to store your collection digitally",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

