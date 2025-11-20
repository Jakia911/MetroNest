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
import { useMemo, useState } from "react";

const properties = [
  {
    id: 1,
    title: "Charming Beach House",
    address: "39581 Rohan Estates, New York",
    price: 179800,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr.png",
    status: "For Sale",
  },
  {
    id: 2,
    title: "Contemporary Loft",
    address: "39581 Rohan Estates, New York",
    price: 335800,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr2.png",
    status: "For Sale",
  },
  {
    id: 3,
    title: "Cozy Cottage",
    address: "39581 Rohan Estates, New York",
    price: 250800,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr3.png",
    status: "For Sale",
  },
  {
    id: 4,
    title: "Modern Beach House",
    address: "39581 Rohan Estates, New York",
    price: 295400,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr4.png",
    status: "For Sale",
  },
  {
    id: 5,
    title: "Cozy Mountain Cabin",
    address: "39581 Rohan Estates, New York",
    price: 310200,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr5.png",
    status: "For Sale",
  },
  {
    id: 6,
    title: "Modern Apartment",
    address: "39581 Rohan Estates, New York",
    price: 220900,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr.png",
    status: "For Sale",
  },
  {
    id: 7,
    title: "Charming Beach House",
    address: "39581 Rohan Estates, New York",
    price: 179800,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr.png",
    status: "For Sale",
  },
  {
    id: 8,
    title: "Contemporary Loft",
    address: "39581 Rohan Estates, New York",
    price: 335800,
    beds: 4,
    baths: 2,
    area: 1500,
    image: "/images/pr2.png",
    status: "For Sale",
  },
];

const sortOptions = [
  { value: "default", label: "Default Sorting" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
];

export default function PropertyListingSection() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);

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
  }, [sortBy]);

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

        {/* Cards */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-6"
          }
        >
          {sortedProperties.map((property) => {
            const isFav = favorites.includes(property.id);

            return (
              <article
                key={property.id}
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
                      src={property.image}
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
                    onClick={() => toggleFavorite(property.id)}
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
                        href={`/properties/${property.id}`}
                        className="hover:text-[#f05454] transition-colors"
                      >
                        {property.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                      <MapPin className="h-3 w-3 text-[#f05454]" />
                      <span className="line-clamp-1">{property.address}</span>
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
                    <button
                      type="button"
                      className="inline-flex h-10 items-center rounded-full bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
