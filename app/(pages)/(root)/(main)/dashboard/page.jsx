"use client";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Home,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  MoreHorizontal,
  Phone,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stats = [
  {
    label: "Active Listings",
    value: "128",
    change: "+12",
    sublabel: "in the last 30 days",
    icon: Home,
  },
  {
    label: "New Leads",
    value: "54",
    change: "+8",
    sublabel: "this week",
    icon: Users,
  },
  {
    label: "Scheduled Tours",
    value: "19",
    change: "+4",
    sublabel: "upcoming 7 days",
    icon: CalendarDays,
  },
  {
    label: "Avg. Days on Market",
    value: "24",
    change: "-3",
    sublabel: "vs last month",
    icon: TrendingUp,
  },
];

const upcomingTours = [
  {
    property: "Modern Loft in Downtown",
    time: "Today • 3:30 PM",
    client: "Sarah Miller",
    location: "New York, Manhattan",
  },
  {
    property: "Family Home with Garden",
    time: "Tomorrow • 10:00 AM",
    client: "James Carter",
    location: "Brooklyn, NYC",
  },
  {
    property: "Skyline View Apartment",
    time: "Thu • 1:15 PM",
    client: "Priya Singh",
    location: "Queens, NYC",
  },
];

const recentLeads = [
  {
    name: "Daniel Roberts",
    budget: "$900k",
    type: "3BR Apartment",
    status: "New",
    source: "Website Form",
  },
  {
    name: "Amelia Watson",
    budget: "$1.2M",
    type: "Single Family Home",
    status: "In Follow-up",
    source: "Instagram",
  },
  {
    name: "Carlos Rivera",
    budget: "$750k",
    type: "2BR Condo",
    status: "Hot",
    source: "Referral",
  },
  {
    name: "Emily Chen",
    budget: "$1.5M",
    type: "Penthouse",
    status: "Tour Booked",
    source: "Google Ads",
  },
];

const topProperties = [
  {
    title: "Luxury Townhouse with Garden",
    location: "Park Slope, Brooklyn",
    price: "$1,250,000",
    stats: "18 active leads • 6 tours",
    badge: "Most Viewed",
    image: "/images/pr.png",
  },
  {
    title: "Skyline View Penthouse",
    location: "Midtown, Manhattan",
    price: "$2,980,000",
    stats: "11 active leads • 3 tours",
    badge: "Premium",
    image: "/images/pr2.png",
  },
  {
    title: "Cozy Family Home",
    location: "Astoria, Queens",
    price: "$830,000",
    stats: "9 active leads • 4 tours",
    badge: "Trending",
    image: "/images/pr3.png",
  },
  {
    title: "Cozy Family Home",
    location: "Astoria, Queens",
    price: "$830,000",
    stats: "9 active leads • 4 tours",
    badge: "Trending",
    image: "/images/pr4.png",
  },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Listings", icon: Home },
  { label: "Leads & CRM", icon: Users },
  { label: "Tours & Calendar", icon: CalendarDays },
  { label: "Agencies & Teams", icon: Building2 },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // While checking session
  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F4EEE8]">
        <p className="text-sm text-slate-600">Checking your session...</p>
      </main>
    );
  }

  // Avoid flicker when redirecting
  if (!session) return null;

  const displayName = session.user?.name || session.user?.email || "MetroNest Realty";

  return (
    <main className="min-h-screen bg-[#F4EEE8]">
      <div className="flex min-h-screen">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-72 flex-col border-r border-slate-100 bg-white/95 px-5 py-6 shadow-sm backdrop-blur lg:flex">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-sm">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-rose-500 uppercase">
                MetroNest
              </p>
              <p className="text-sm font-semibold text-slate-900">
                Agency Dashboard
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm transition ${
                    item.active
                      ? "bg-slate-900 text-slate-50 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100/70"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-xl ${
                        item.active ? "bg-slate-800/80" : "bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 ${
                          item.active ? "text-rose-300" : "text-slate-500"
                        }`}
                      />
                    </span>
                    {item.label}
                  </span>
                  {item.active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom quick stat */}
          <div className="mt-auto rounded-2xl bg-slate-900 px-4 py-4 text-slate-100">
            <p className="text-[11px] font-medium text-slate-300">
              Today&apos;s Snapshot
            </p>
            <p className="mt-1 text-lg font-semibold">3 new tour bookings</p>
            <p className="mt-1 text-[11px] text-slate-400">
              Stay under 15 min response time for higher close rates.
            </p>
          </div>
        </aside>

        {/* Mobile sidebar sheet */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative z-50 flex w-72 flex-col border-r border-slate-100 bg-white px-5 py-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-500 text-white">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    MetroNest
                  </p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <nav className="mt-6 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm transition ${
                        item.active
                          ? "bg-slate-900 text-slate-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-100/70"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-xl ${
                            item.active ? "bg-slate-800/80" : "bg-slate-100"
                          }`}
                        >
                          <Icon
                            className={`h-3.5 w-3.5 ${
                              item.active ? "text-rose-300" : "text-slate-500"
                            }`}
                          />
                        </span>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-20 border-b border-slate-100 bg-[#F4EEE8]/80 backdrop-blur">
            <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </button>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-rose-500">
                    Dashboard
                  </p>
                  <h1 className="text-lg font-semibold text-slate-900 sm:text-xl md:text-2xl">
                    Welcome back, {displayName}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 shadow-sm sm:flex">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    ●
                  </span>
                  Response SLA:{" "}
                  <span className="font-semibold text-slate-800">
                    12 min avg
                  </span>
                </div>
                <button className="inline-flex items-center justify-center rounded-2xl bg-rose-500 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-rose-600 hover:shadow-md sm:text-sm">
                  + Add New Listing
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {/* Search + quick stats header row */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search listings, leads, tours..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-9 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span className="rounded-full bg-white px-3 py-1 shadow-sm">
                  NYC Market •{" "}
                  <span className="font-semibold text-slate-800">Active</span>
                </span>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700">
                  9 deals closing this month
                </span>
              </div>
            </div>

            {/* Stats */}
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.change} • {item.sublabel}
                        </p>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-rose-500 to-rose-400" />
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Main content layout */}
            <section className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.1fr)]">
              {/* Left column */}
              <div className="flex flex-col gap-7">
                {/* Top properties */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                      Top Performing Listings
                    </h2>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-rose-500 hover:text-rose-600">
                      View all
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {topProperties.map((property) => (
                      <div
                        key={property.title}
                        className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/60"
                      >
                        <div className="relative h-40 w-full">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-rose-500 shadow-sm">
                            {property.badge}
                          </div>
                        </div>
                        <div className="space-y-1.5 p-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {property.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="h-3 w-3" />
                            <span>{property.location}</span>
                          </div>
                          <p className="text-sm font-semibold text-rose-500">
                            {property.price}
                          </p>
                          <p className="text-xs text-slate-500">
                            {property.stats}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent leads */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                      Recent Leads
                    </h2>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                      Response time: 12 min avg
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                          <th className="py-2.5 pr-4">Lead</th>
                          <th className="py-2.5 pr-4">Budget</th>
                          <th className="py-2.5 pr-4">Looking for</th>
                          <th className="py-2.5 pr-4">Status</th>
                          <th className="py-2.5 pr-4">Source</th>
                          <th className="py-2.5" />
                        </tr>
                      </thead>
                      <tbody>
                        {recentLeads.map((lead) => (
                          <tr
                            key={lead.name}
                            className="border-b border-slate-50 last:border-0"
                          >
                            <td className="py-3.5 pr-4 text-[13px] font-medium text-slate-900">
                              {lead.name}
                            </td>
                            <td className="py-3.5 pr-4 text-[13px] text-slate-700">
                              {lead.budget}
                            </td>
                            <td className="py-3.5 pr-4 text-[13px] text-slate-700">
                              {lead.type}
                            </td>
                            <td className="py-3.5 pr-4">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                  lead.status === "Hot"
                                    ? "bg-rose-50 text-rose-600"
                                    : lead.status === "Tour Booked"
                                    ? "bg-sky-50 text-sky-600"
                                    : lead.status === "In Follow-up"
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-slate-50 text-slate-500"
                                }`}
                              >
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3.5 pr-4 text-[12px] text-slate-500">
                              {lead.source}
                            </td>
                            <td className="py-3.5">
                              <button className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-7">
                {/* Agent card */}
                <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 text-slate-50 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-slate-700">
                        <Image
                          src="/images/agent-avatar.jpg"
                          alt="Agent"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-300">
                          Lead Agent
                        </p>
                        <p className="text-sm font-semibold text-white">
                          MetroNest Team
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                      Online • 5 active chats
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 text-xs text-slate-200">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-rose-300" />
                      <span>support@metronest.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-rose-300" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-3.5">
                      <p className="text-[11px] text-slate-300">
                        Monthly Volume
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        $4.2M
                      </p>
                      <p className="text-[11px] text-emerald-300">
                        +23% vs last month
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3.5">
                      <p className="text-[11px] text-slate-300">
                        Conversion Rate
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        18.4%
                      </p>
                      <p className="text-[11px] text-slate-300">
                        from qualified leads
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upcoming tours */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                      Upcoming Tours
                    </h2>
                    <button className="text-xs font-medium text-rose-500 hover:text-rose-600">
                      Manage calendar
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {upcomingTours.map((tour) => (
                      <div
                        key={tour.property + tour.time}
                        className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5"
                      >
                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm">
                          <CalendarDays className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-900">
                            {tour.property}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {tour.time} • {tour.client}
                          </p>
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                            <MapPin className="h-3 w-3" />
                            <span>{tour.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sales funnel snapshot */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                    Sales Funnel Snapshot
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Track how leads move across your MetroNest pipeline.
                  </p>

                  <div className="mt-4 flex flex-col gap-3">
                    {[
                      {
                        label: "New Leads",
                        value: 52,
                        width: "82%",
                        color: "bg-rose-400",
                      },
                      {
                        label: "Qualified",
                        value: 31,
                        width: "64%",
                        color: "bg-amber-400",
                      },
                      {
                        label: "Tours Booked",
                        value: 19,
                        width: "48%",
                        color: "bg-sky-400",
                      },
                      {
                        label: "Closed Deals",
                        value: 9,
                        width: "32%",
                        color: "bg-emerald-400",
                      },
                    ].map((stage) => (
                      <div key={stage.label} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{stage.label}</span>
                          <span className="font-medium text-slate-800">
                            {stage.value}
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${stage.color}`}
                            style={{ width: stage.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
