"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/gallery";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signup(form.email, form.password, form.name);
      router.replace(next);
    } catch (err: any) {
      setError(err?.message || "Failed to sign up");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 w-full max-w-md shadow-lg border border-black rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Display name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            {busy ? "Creating..." : "Sign up"}
          </button>
        </form>

        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

        <p className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <a
            className="underline text-blue-600 hover:text-blue-800"
            href="/login"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
