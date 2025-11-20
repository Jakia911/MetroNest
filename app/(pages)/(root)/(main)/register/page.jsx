"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to register");
        setLoading(false);
        return;
      }

      // Auto login after successful registration
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginRes?.error) {
        setError(loginRes.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-black">Create an account</h1>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-xl border px-3 py-2 text-sm text-black"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border px-3 py-2 text-sm text-black"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone (optional)"
          className="w-full rounded-xl border px-3 py-2 text-sm text-black"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border px-3 py-2 text-sm text-black"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#f05454] py-2 text-sm font-semibold text-white disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#f05454]">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
