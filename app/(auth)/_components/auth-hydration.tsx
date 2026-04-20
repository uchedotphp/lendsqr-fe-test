"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/(auth)/_services/auth-store";

export function AuthHydration({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isHydrated, setIsHydrated] = useState(false);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
    setIsHydrated(true);
  }, [hydrate]);

  if (!isHydrated) {
    return null;
  }

  return children;
}
