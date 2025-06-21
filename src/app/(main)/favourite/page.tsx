"use client";

import useFavBlogStore from "@/store/favoriteStore/favoriteStore";
import useAuthStore from "@/store/authStore/authStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Favourite = () => {
  const { favorites, removeFav } = useFavBlogStore((state) => state);
  const { user } = useAuthStore((state) => state);

  const userFavorites = favorites.filter(
    (fav) => fav.username === user?.username
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Favourite Blogs
      </h1>

      {userFavorites.length === 0 ? (
        <p className="text-gray-600 text-center">No favorite blogs found.</p>
      ) : (
        <div className="space-y-4">
          {userFavorites.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/blogs/${item.blogid}`} className="flex">
                <Image
                  src={item.image}
                  alt={item.title} 
                  width={150}
                  height={150}
                  className="object-cover"
                />

                <div className="p-4 w-full">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="text-xs text-gray-400 mt-3">
                    By {item.auther} |{" "}
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
              </Link>

              <div className="flex items-center px-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  onClick={() => removeFav(item.blogid)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
