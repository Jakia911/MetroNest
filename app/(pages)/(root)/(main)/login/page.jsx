"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold">Log in</h1>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border px-3 py-2 text-sm"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border px-3 py-2 text-sm"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#f05454] py-2 text-sm font-semibold text-white disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-[#f05454]">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
