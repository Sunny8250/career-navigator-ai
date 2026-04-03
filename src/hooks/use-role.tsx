import { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "user";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAdmin: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem("careerai-role") as Role) || "admin";
  });

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem("careerai-role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole, isAdmin: role === "admin" }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
}
