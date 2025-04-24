import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "This is the login page for your application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div>
        {children}
     </div>
  );
}
