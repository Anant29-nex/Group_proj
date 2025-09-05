"use client";

import { useAuth } from "@/src/context/AuthContext";
import LogoutButton from "@/src/components/LogoutButton";

export default function GalleryPage() {
  const { user } = useAuth();

  return (
    <main className="w-screen h-screen bg-gray-100 p-4">
      <div className="flex flex-col h-full border border-black rounded-lg shadow-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black">
          <h1 className="text-2xl font-semibold">
            <strong>{user?.displayName || user?.email}</strong>'s Gallery
          </h1>
          <LogoutButton />
        </div>

        {/* Welcome Text */}
        <div className="p-4">
          <p>
            Welcome, <strong>{user?.displayName || user?.email}</strong>
          </p>
        </div>

        {/* Gallery Section */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="w-full h-full border border-gray-400 rounded flex items-center justify-center text-gray-500">
            [ Gallery images will go here ]
          </div>
        </div>
      </div>
    </main>
  );
}
