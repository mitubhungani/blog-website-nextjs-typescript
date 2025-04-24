// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import useBlogStore from "@/store/blogStore/blogStore";
// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const GetBlogs = () => {
//   const { blogs } = useBlogStore((ele) => ele);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const initialSearch = searchParams.get("search") || "";
//   const [searchItem, setSearchItem] = useState<string>(initialSearch);
//   const [debouncedSearchItem, setDebouncedSearchItem] = useState<string>(initialSearch);

//   // Debounce effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchItem(searchItem.trim());
//     }, 800); // 800ms delay

//     return () => clearTimeout(timer);
//   }, [searchItem]);

//   // Update URL when debouncedSearchItem changes
//   useEffect(() => {
//     const params = new URLSearchParams();
//     if (debouncedSearchItem) {
//       params.set("search", debouncedSearchItem);
//     }
//     router.replace(`?${params.toString()}`);
//   }, [debouncedSearchItem,router]);

//   // Filter blogs
//   const filteredBlogs = blogs.filter((blog) =>
//     blog.title.toLowerCase().includes(debouncedSearchItem.toLowerCase())
//   // ||   blog.content.toLowerCase().includes(searchItem.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="flex justify-end mb-6">
//         <div className="w-full sm:w-1/3">
//           <Input
//             placeholder="Search blogs..."
//             value={searchItem}
//             onChange={(e) => setSearchItem(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredBlogs.length > 0 ? (
//           filteredBlogs.map((blog) => (
//             <Link
//               href={`/dashboard/blogs/${blog.id}`}
//               key={blog.id}
//               className="group"
//             >
//               <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer p-0">
//                 <CardHeader className="p-0">
//                   <Image
//                     src={blog.image}
//                     alt="blog image"
//                     width={400}
//                     height={250}
//                     className="w-full h-52 object-cover rounded-t-xl"
//                   />
//                 </CardHeader>
//                 <CardContent className="p-4 space-y-2">
//                   <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//                     {blog.title}
//                   </CardTitle>
//                   <CardDescription className="text-sm text-gray-600 line-clamp-3">
//                     {blog.content}
//                   </CardDescription>
//                   <div className="text-xs text-gray-400 mt-3">
//                     By {blog.auther}
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))
//         ) : (
//           <div className="text-center col-span-full text-gray-600">
//             No blogs found 🔍
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetBlogs;




// app/(main)/dashboard/blogs/page.tsx
// import { Suspense } from "react";
// import GetBlogs from "./GetBlogs"; // adjust path if needed

// interface PageProps {
//   params: { url: {search:string} };
// }

// export function generateMetadata({ params }: PageProps) {
//     console.log(params.url);
//   const { search } = params.url;

//   const searchDecode = decodeURIComponent(search);
//   console.log("searchDecode", searchDecode);
//   return {
//     title: `Blogs - ${searchDecode}`,
//     description: `Explore blogs related to ${searchDecode}`,
//   };
// }


// export default function BlogsPage() {
  
//   return (
//     <div className="p-6">
//       <Suspense fallback={<div>Loading blogs...</div>}>
//         <GetBlogs />
//       </Suspense>
//     </div>
//   );
// }




// // BlogsPage.tsx
// import { Suspense } from "react";
// import GetBlogs from "./GetBlogs"; // adjust path if needed

// interface PageProps {
//   params: { url?: string };
//   searchParams: { search?: string };
// }

// export function generateMetadata({ searchParams }: PageProps) {
//   const search = searchParams.search || "";
//   const searchDecode = decodeURIComponent(search);
//   console.log("searchDecode", searchDecode);
  
//   return {
//     title: search ? `Blogs - ${searchDecode}` : "Blogs",
//     description: search ? `Explore blogs related to ${searchDecode}` : "Explore our blogs",
//   };
// }

// export default function BlogsPage() {
//   return (
//     <div className="p-6">
//       <Suspense fallback={<div>Loading blogs...</div>}>
//         <GetBlogs />
//       </Suspense>
//     </div>
//   );
// }



import { Suspense } from "react";
import GetBlogs from "./GetBlogs"; // adjust path if needed

// ✅ This is all you need — don't define a custom PageProps interface
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
