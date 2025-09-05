"use client";

import { useAuth } from "@/src/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button className="border rounded p-2" onClick={logout}>
      Logout
    </button>
  );
}
