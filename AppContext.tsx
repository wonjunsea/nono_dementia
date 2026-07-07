import React, { createContext, useContext, useMemo, useState } from "react";

export type UserRole = "elder" | "guardian" | null;

type AppState = {
  role: UserRole;
  setRole: (r: UserRole) => void;
  userName: string;
  setUserName: (n: string) => void;
  lastCistScore: number | null;
  setLastCistScore: (s: number | null) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>("김순자");
  const [lastCistScore, setLastCistScore] = useState<number | null>(24);

  const value = useMemo(
    () => ({ role, setRole, userName, setUserName, lastCistScore, setLastCistScore }),
    [role, userName, lastCistScore]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
