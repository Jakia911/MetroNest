// app/components/ExploreNeighborhoodsSection.tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const neighborhoods = [
  {
    name: "New Jersey, New York",
    properties: 135,
    image: "/images/pr.png",
  },
  {
    name: "Cape Town, South Africa",
    properties: 225,
    image: "/images/pr2.png",
  },
  {
    name: "Los Angeles, New York",
    properties: 143,
    image: "/images/pr3.png",
  },
  {
    name: "Seoul, South Korea",
    properties: 321,
    image: "/images/pr4.png",
  },
];

const ExploreNeighborhoodsSection = () => {
  return (
    <section className="w-full bg-[#FBF7F5] py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
            <span className="h-[1px] w-6 bg-rose-500" />
            <span>Explore Cities</span>
            <span className="h-[1px] w-6 bg-rose-500" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
            Explore The Neighborhoods
          </h2>

          <p className="max-w-xl text-sm md:text-base text-slate-500">
            Find your dream apartment with our listing of top neighborhoods
            around the world.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoods.map((city, index) => {
            const isFirst = index === 0;
            const isLast = index === neighborhoods.length - 1;

            return (
              <div
                key={city.name}
                className="relative overflow-hidden rounded-[32px] min-h-[420px] sm:min-h-[420px] lg:min-h-[420px]"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                </div>

                {/* Arrow buttons (only on first & last) */}
                {isFirst && (
                  <button className="absolute left-6 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-rose-500 shadow-lg">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                {isLast && (
                  <button className="absolute right-6 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-rose-500 shadow-lg">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}

                {/* Text content */}
                <div className="relative z-10 flex h-full items-end">
                  <div className="p-6 sm:p-7">
                    <p className="text-xs sm:text-sm font-medium text-slate-100/90">
                      {city.properties} Properties
                    </p>
                    <h3 className="mt-1 text-lg sm:text-xl font-semibold leading-snug text-white">
                      {city.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreNeighborhoodsSection;
