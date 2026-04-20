import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      login: (email: string) => {
        set({ isAuthenticated: true, userEmail: email });
      },
      logout: () => {
        set({ isAuthenticated: false, userEmail: null });
      },
      hydrate: () => {
        set((state) => ({ ...state }));
      },
    }),
    {
      name: "lendsqr-auth-state",
    },
  ),
);
