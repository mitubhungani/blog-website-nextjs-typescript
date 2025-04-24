// app/(main)/(dashboard)/blogs/[id]/layout.tsx

import { ReactNode } from "react";

// ✅ This function should only run on the server
export async function generateMetadata({ params,}: { params:Promise<{ id: string }>}) {
  const { id } =await params;

  // You could fetch data here if needed
  return {
    title: `Blog - ${id}`,
    description: `Explore blog with ID ${id}`,
  };
}

// ✅ Layout component
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
