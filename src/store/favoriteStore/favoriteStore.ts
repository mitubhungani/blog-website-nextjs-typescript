import { FavoriteType } from "@/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BlogStore {
  favorites: FavoriteType[];
  addFavBlog: (fav: FavoriteType) => void;
  removeFav: (blogid: string) => void;
  isFavorite: (blogid: string, userid: string) => boolean;
}

const useFavBlogStore = create<BlogStore>()(
  devtools(
    persist(
      (set, get) => ({
        favorites: [],

        addFavBlog: (fav) => {
          const existing = get().favorites.some(
            (f) => f.blogid === fav.blogid && f.username === fav.username
          );
          if (!existing) {
            set((state) => ({
              favorites: [...state.favorites, fav],
            }));
          }
        },

        removeFav: (blogid) =>
          set((state) => ({
            favorites: state.favorites.filter(
              (fav) => !(fav.blogid === blogid )
            ),
          })),

        isFavorite: (blogid, username) =>
          get().favorites.some(
            (fav) => fav.blogid === blogid && fav.username === username
          ),
      }),
      {
        name: "favoriteBlog",
      }
    )
  )
);

export default useFavBlogStore;
