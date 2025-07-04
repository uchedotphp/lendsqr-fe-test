import { createContext, type ReactNode, useState } from "react";
import type { UserProfileSchemaType } from "schemas/Schema";

interface UserContextProps {
  user: UserProfileSchemaType | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserProfileSchemaType | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  error: null,
  setUser: () => {},
  setLoading: () => {},
  setError: () => {},
} as UserContextProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfileSchemaType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
        setLoading,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 