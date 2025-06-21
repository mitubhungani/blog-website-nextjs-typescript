import { CommentType } from "@/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CommentStore {
  comments: CommentType[];
  addComment: (comment: CommentType) => void;
  removeComment: (id: string) => void;
  updateComment: (id: string, updatedComment: CommentType) => void;
  removeCommentsByBlogId: (blogid: string) => void;
}

const useCommentStore = create<CommentStore>()(
  devtools(
    persist(
      (set) => ({
        comments: [],
        addComment: (comment) =>
          set((state) => ({
            ...state,
            comments: [...state.comments, comment],
          })),
        removeComment: (id) =>
          set((state) => ({
            ...state,
            comments: state.comments.filter((comment) => comment.id !== id),
          })),
        updateComment: (id, updatedComment) =>
          set((state) => ({
            ...state,
            comments: state.comments.map((comment) =>
              comment.id === id ? updatedComment : comment
            ),
          })),
        removeCommentsByBlogId: (blogid) =>
          set((state) => ({
            ...state,
            comments: state.comments.filter(
              (comment) => comment.blogid !== blogid
            ),
          })),
      }),
      { name: "comment-Store" }
    )
  )
);

export default useCommentStore;
