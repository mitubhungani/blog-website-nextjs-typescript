"use client";

import React from "react";
import useBlogStore from "@/store/blogStore/blogStore";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

const FeaturedBlog = () => {
  const { blogs } = useBlogStore((state) => state);
  const featured = blogs.slice(0, 3);

  return (
    <section className="py-14 px-6 sm:px-10 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Featured Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map((blog) => (
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

                  <div className="mt-auto pt-1">
                    <span className="text-[#a362ff] text-xs font-medium inline-block hover:underline">
                      Read more →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
