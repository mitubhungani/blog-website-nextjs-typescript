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
//   const [debouncedSearchItem, setDebouncedSearchItem] =
//     useState<string>(initialSearch);

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
//   }, [debouncedSearchItem, router]);

//   // Filter blogs
//   const filteredBlogs = blogs.filter(
//     (blog) =>
//       blog.title.toLowerCase().includes(debouncedSearchItem.toLowerCase())
//     // ||   blog.content.toLowerCase().includes(searchItem.toLowerCase())
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
//             <Link href={`/blogs/${blog.id}`} key={blog.id} className="group">
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
//                     <div
//                       className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none text-foreground/90"
//                       dangerouslySetInnerHTML={{
//                         __html:
//                           blog.content ||
//                           "<p>No article content available.</p>",
//                       }}
//                     >
//                       {/* {blog.content} */}
//                     </div>
//                   </CardDescription>
//                   <div className="text-xs text-gray-400 mt-3">
//                     {/* By {blog.auther} */}
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




"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import useBlogStore from "@/store/blogStore/blogStore";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

const GetBlogs = () => {
  const { blogs } = useBlogStore((ele) => ele);
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const [searchItem, setSearchItem] = useState<string>(initialSearch);
  const [debouncedSearchItem, setDebouncedSearchItem] =
    useState<string>(initialSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchItem(searchItem.trim());
    }, 800);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchItem) {
      params.set("search", debouncedSearchItem);
    }
    router.replace(`?${params.toString()}`);
  }, [debouncedSearchItem, router]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(debouncedSearchItem.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="flex justify-end mb-6">
        <div className="w-full sm:w-1/3">
          <Input
            placeholder="Search blogs..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id} className="group">
            <Card className="bg-white rounded-xl shadow hover:shadow-lg p-0 transition-all duration-300 h-full flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={blog.image}
                  alt="blog image"
                  width={400}
                  height={200}
                  className="w-full h-44 object-cover rounded-t-xl "
                />
              </CardHeader>

              <CardContent className="p-4 flex flex-col flex-grow space-y-2">
                <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-[#a362ff] transition-colors leading-tight">
                  {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
                </CardTitle>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback>
                        {blog.auther?.[0]?.toUpperCase() || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate max-w-[80px]">
                      {blog.auther || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    <span>
                      {blog.date
                        ? format(new Date(blog.date), "dd MMM yyyy")
                        : "Unknown"}
                    </span>
                  </div>
                </div>

                <CardDescription className="text-gray-600 text-sm leading-snug line-clamp-2 flex-grow">
                  <div
                    className="prose prose-slate dark:prose-invert prose-sm max-w-none text-foreground/90"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.content ||
                        "<p>No article content available.</p>",
                    }}
                  />
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-600">
            No blogs found 🔍
          </div>
        )}
      </div>
    </div>
  );
};

export default GetBlogs;
