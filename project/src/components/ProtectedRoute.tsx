"use client";

import { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router]);

  if (loading || !user) {
    return <div className="p-8">Checking session…</div>;
  }

  return <>{children}</>;
}
