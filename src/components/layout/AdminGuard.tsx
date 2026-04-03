import { Navigate } from "react-router-dom";
import { useRole } from "@/hooks/use-role";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useRole();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
