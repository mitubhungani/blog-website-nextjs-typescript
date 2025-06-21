import { BlogType } from "@/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BlogStore {
  blogs: BlogType[];
  addBlog: (blog: BlogType) => void;
  removeBlog: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateBlog: (id: string, updatedBlog: BlogType) => void;
  getBlogById: (id: string) => BlogType | undefined;
}

const useBlogStore = create<BlogStore>()(
  devtools(
    persist(
      (set, get) => ({
        blogs: [],
        addBlog: (blog) =>
          set((state) => ({ ...state, blogs: [...state.blogs, blog] })),
        removeBlog: (id) =>
          set((state) => ({
            ...state,
            blogs: state.blogs.filter((b) => b.id !== id),
          })),
        toggleFavorite: (id) =>
          set((state) => ({
            ...state,
            blogs: state.blogs.map((b) =>
              b.id === id ? { ...b, isFavorite: !b.isFavorite } : b
            ),
          })),
        updateBlog: (id, updatedBlog) =>
          set((state) => ({
            ...state,
            blogs: state.blogs.map((b) =>
              b.id === id ? { ...b, ...updatedBlog } : b
            ),
          })),
        getBlogById: (id) => get().blogs.find((b) => b.id === id),
      }),
      { name: "blog-Store" }
    )
  )
);

export default useBlogStore;
