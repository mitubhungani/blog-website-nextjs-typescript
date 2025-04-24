import { UserType } from "@/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore {
  isLogin: boolean;
  users: UserType[];
  user: UserType | null;
  signupUser: (user: UserType) => void;
  loginUser: (user: UserType) => void;
  logoutUser: () => void;
  initialize: (authState: { isLogin: boolean; user: UserType | null }) => void;
}

const useAuthStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        isLogin: false,
        user: null,
        signupUser: (user) =>
            set((state) => ({...state, users: [...state.users, user],isLogin: true, user })),
        loginUser: (user) =>
          set((state) => ({ ...state, isLogin: true, user })),
        logoutUser: () =>
          set((state) => ({ ...state, isLogin: false, user: null })),
        initialize: (authState) => set(authState),
      }),
      { name: "auth-store" }
    )
  )
);

export default useAuthStore;
