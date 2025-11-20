// app/components/StunningGallerySection.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

const FILTERS = ["View All", "Apartment", "Commercial", "Land Or Plot", "Farm"];

const GALLERY_ITEMS = [
  // ROW 1
  {
    id: 1,
    category: "Apartment",
    src: "/images/pr.png",
    alt: "Modern luxury apartment exterior",
    lgColSpan: "lg:col-span-1",
  },
  {
    id: 2,
    category: "Apartment",
    src: "/images/pr2.png",
    alt: "Luxury living room",
    lgColSpan: "lg:col-span-2",
  },
  {
    id: 3,
    category: "Commercial",
    src: "/images/pr3.png",
    alt: "Mountain view villa",
    lgColSpan: "lg:col-span-1",
  },
  // ROW 2
  {
    id: 4,
    category: "Land Or Plot",
    src: "/images/pr4.png",
    alt: "Large house with pool",
    lgColSpan: "lg:col-span-2",
  },
  {
    id: 5,
    category: "Apartment",
    src: "/images/pr5.png",
    alt: "Three-story modern home",
    lgColSpan: "lg:col-span-1",
  },
  {
    id: 6,
    category: "Farm",
    src: "/images/pr6.jpg",
    alt: "Villa with pool at dusk",
    lgColSpan: "lg:col-span-1",
  },
  // ROW 3 (optional – keep same pattern)
  {
    id: 7,
    category: "Apartment",
    src: "/images/pr8.png",
    alt: "Concrete and glass villa",
    lgColSpan: "lg:col-span-1",
  },
  {
    id: 8,
    category: "Commercial",
    src: "/images/sl1.png",
    alt: "Interior with tall windows",
    lgColSpan: "lg:col-span-2",
  },
  {
    id: 9,
    category: "Land Or Plot",
    src: "/images/sl2.avif",
    alt: "Wide modern home",
    lgColSpan: "lg:col-span-1",
  },
];

export default function StunningGallerySection() {
  const [activeFilter, setActiveFilter] = useState("View All");

  const filteredItems =
    activeFilter === "View All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-0">
        {/* Top label + title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
            <span className="h-[1px] w-6 bg-red-500" />
            <span>Gallery</span>
            <span className="h-[1px] w-6 bg-red-500" />
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
            MetroNest Gallery
          </h2>

          {/* Filter buttons */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-800 hover:border-black"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-[20px] bg-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl ${item.lgColSpan}`}
            >
              <div className={`relative w-full h-64 sm:h-80 lg:h-64 xl:h-80`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className=" transition-transform duration-500 group-hover:scale-105 h-auto w-full"
                />
              </div>

              {/* subtle dark overlay on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-black/0 transition group-hover:bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
