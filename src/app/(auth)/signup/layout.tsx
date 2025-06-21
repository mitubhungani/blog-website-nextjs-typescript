import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Page",
  description: "This is the signup page for your application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
