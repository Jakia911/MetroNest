// app/components/PropertyListingSection.jsx
"use client";

import {
  Bath,
  BedDouble,
  ChevronDown,
  Heart,
  LayoutGrid,
  List,
  MapPin,
  Maximize2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const sortOptions = [
  { value: "default", label: "Default Sorting" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
];

export default function PropertyListingSection() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/properties");
        const result = await response.json();

        if (result.success) {
          setProperties(result.data);
        } else {
          toast.error("Failed to load properties");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Error loading properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const sortedProperties = useMemo(() => {
    const list = [...properties];
    if (sortBy === "priceLowHigh") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [sortBy, properties]);

  const formatPrice = (amount) =>
    amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  return (
    <section className="w-full bg-[#f5f7fb] py-20">
      <div className="mx-auto max-w-[1500px] px-4 lg:px-0">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">
            Property Listing
          </h2>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition ${
                  viewMode === "grid"
                    ? "bg-[#f05454] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition ${
                  viewMode === "list"
                    ? "bg-[#f05454] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-full border border-slate-200 bg-white pl-4 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-[#f05454] focus:ring-2 focus:ring-[#f05454]/10 appearance-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-lg text-slate-600">Loading properties...</div>
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-6"
            }
          >
            {sortedProperties.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-600">
                No properties found
              </div>
            ) : (
              sortedProperties.map((property) => {
                const isFav = favorites.includes(property._id);

                return (
                  <article
                    key={property._id}
                    className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] ${
                      viewMode === "list"
                        ? "flex flex-col md:flex-row"
                        : "flex flex-col"
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative w-full overflow-hidden ${
                        viewMode === "list" ? "md:w-[48%]" : ""
                      }`}
                    >
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={
                            property.mainImage ||
                            property.images?.[0] ||
                            "/images/pr.png"
                          }
                          alt={property.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Status badge */}
                      <div className="pointer-events-none absolute left-5 top-6">
                        <div className="relative">
                          <div className="h-9 w-24 rounded-full bg-[#f05454] text-center text-xs font-semibold leading-9 text-white shadow-md">
                            {property.status}
                          </div>
                          <div className="absolute -bottom-2 left-6 h-2 w-6 rotate-45 bg-[#f05454]" />
                        </div>
                      </div>

                      {/* Favorite button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(property._id)}
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white/90 text-slate-500 shadow-md backdrop-blur transition hover:bg-rose-50 hover:text-rose-500"
                      >
                        <Heart
                          className={`h-4 w-4 transition ${
                            isFav ? "fill-rose-500 text-rose-500" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex flex-1 flex-col border-t border-slate-100 bg-white px-6 pb-5 pt-4 ${
                        viewMode === "list" ? "md:border-t-0 md:border-l" : ""
                      }`}
                    >
                      {/* Title + address */}
                      <div className="mb-3">
                        <h3 className="mb-1 line-clamp-1 text-[18px] font-semibold text-slate-900">
                          <Link
                            href={`/properties/${property._id}`}
                            className="hover:text-[#f05454] transition-colors"
                          >
                            {property.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                          <MapPin className="h-3 w-3 text-[#f05454]" />
                          <span className="line-clamp-1">
                            {property.address}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4 flex flex-wrap items-center gap-4 border-y border-slate-100 py-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <BedDouble className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-slate-700">
                            Bed {property.beds}
                          </span>
                        </div>
                        <span className="hidden h-3 w-px bg-slate-200 sm:block" />
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-slate-700">
                            Bath {property.baths}
                          </span>
                        </div>
                        <span className="hidden h-3 w-px bg-slate-200 sm:block" />
                        <div className="flex items-center gap-1">
                          <Maximize2 className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-slate-700">
                            {property.area} sqft
                          </span>
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="mt-auto flex items-center justify-between gap-4 pt-1">
                        <p className="text-lg font-semibold tracking-tight text-slate-900">
                          {formatPrice(property.price)}
                        </p>
                        <Link
                          href={`/properties/${property._id}`}
                          className="inline-flex h-10 items-center rounded-full bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
}
