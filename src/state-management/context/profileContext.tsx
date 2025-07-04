import { createContext, useState, useCallback, type ReactNode } from "react";
import type { UserProfileSchemaType } from "schemas/Schema";

export interface ProfileContextType {
  profile: UserProfileSchemaType | null;
  updateProfile: (profile: UserProfileSchemaType | null) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  updateProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfileSchemaType | null>(null);

  const updateProfile = useCallback(
    (userProfile: UserProfileSchemaType | null) => {
      setProfile(userProfile);
    },
    []
  );
  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
