import { Suspense } from "react";
import GetBlogs from "./GetBlogs";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;
  const searchDecode = decodeURIComponent(search);
  console.log("searchDecode", searchDecode);
  

  return {
    title: search ? `Blogs - ${searchDecode}` : "Blogs",
    description: search
      ? `Explore blogs related to ${searchDecode}`
      : "Explore our blogs",
  };
}

export default function BlogsPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<div>Loading blogs...</div>}>
        <GetBlogs />
      </Suspense>
    </div>
  );
}
