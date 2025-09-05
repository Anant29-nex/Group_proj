"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/gallery";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(form.email, form.password);
      router.replace(next);
    } catch (err: any) {
      setError(err?.message || "Failed to log in");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 w-full max-w-md shadow-lg border border-black rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Log in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded p-2"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="w-full border border-gray-300 rounded p-2"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg p-2 border border-gray-700 bg-black text-white hover:bg-gray-800 transition"
          >
            {busy ? "Logging in..." : "Log in"}
          </button>
        </form>

        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

        <p className="mt-6 text-sm text-center">
          New here?{" "}
          <a
            className="underline text-blue-600 hover:text-blue-800"
            href="/signup"
          >
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
