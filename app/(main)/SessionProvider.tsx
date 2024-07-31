"use client";

import React, { createContext, useContext } from "react";
import { Session, User } from "lucia";

type SessionContext = {
  user: User;
  session: Session;
};

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession phải được sử dụng trong một SessionProvider");
  }
  return context;
}
