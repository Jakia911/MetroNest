"use client";

import { Home, Mail, Phone, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-[#0b2845] text-slate-100">
      {/* Top info bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            {/* Email */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/90">
                <Mail className="h-3 w-3 text-white" />
              </span>
              <span>infomailexample@mail.com</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/90">
                <Phone className="h-3 w-3 text-white" />
              </span>
              <span>+00 (123) 456 789 00</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Social icons */}
            <div className="hidden items-center gap-3 text-xs sm:flex">
              <Link href="#" className="hover:text-white/80">
                Fb
              </Link>
              <Link href="#" className="hover:text-white/80">
                Tw
              </Link>
              <Link href="#" className="hover:text-white/80">
                In
              </Link>
              <Link href="#" className="hover:text-white/80">
                Wa
              </Link>
            </div>

            {/* Language */}
            <button className="flex items-center gap-1 rounded-full border border-white/15 px-2 py-1 text-xs hover:bg-white/5">
              <span role="img" aria-label="uk-flag">
                🇬🇧
              </span>
              <span>English</span>
              <span className="text-[10px]">▾</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500">
            <div className="flex h-6 w-6 items-end gap-0.5">
              <span className="h-2 w-1 rounded-sm bg-white/90" />
              <span className="h-3 w-1 rounded-sm bg-white/90" />
              <span className="h-4 w-1 rounded-sm bg-white/90" />
            </div>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide">MetroNest</p>
            <p className="text-[11px] text-slate-300">Real Estate Solution</p>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="hover:text-slate-200">
            <button className="flex items-center gap-1 hover:text-slate-200">
              Home
            </button>
          </Link>

          <Link href="/about" className="hover:text-slate-200">
            About Us
          </Link>
          <Link href="/properties">
            <button className="flex items-center gap-1 hover:text-slate-200">
              Properties
            </button>
          </Link>

          <Link href="/contact" className="hover:text-slate-200">
            Contact Us
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Add Listing button (desktop) */}
          <Link
            href="#"
            className="hidden items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-medium hover:bg-white hover:text-[#0b2845] md:flex"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full ">
              <Home className="h-4 w-4 text-white" />
            </span>
            Add Listing
          </Link>

          {/* Search circle */}
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white hover:text-[#0b2845] transition">
            <Search className="h-4 w-4" />
          </button>

          {/* Mobile menu icon */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-xl md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-200 ease-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-white/10 bg-[#0b2845]`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
          <Link href="/" className="hover:text-slate-200">
            Home
          </Link>

          <Link href="/about" className="hover:text-slate-200">
            About Us
          </Link>
          <Link href="/properties">Properties</Link>

          <Link href="/contact" className="hover:text-slate-200">
            Contact Us
          </Link>

          {/* Add listing for mobile */}
          {/* <Link
            href="#"
            className="mt-2 flex items-center justify-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-medium hover:bg-white hover:text-[#0b2845]"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              🏠
            </span>
            Add Listing
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
