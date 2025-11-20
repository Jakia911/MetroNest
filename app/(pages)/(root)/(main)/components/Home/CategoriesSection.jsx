// app/components/CategoriesSection.tsx
"use client";

import {
  Building,
  Building2,
  Home,
  Landmark,
  MapPin,
  Warehouse,
} from "lucide-react";

const categories = [
  {
    name: "Apartment",
    countLabel: "12 Property",
    Icon: Building2,
  },
  {
    name: "House",
    countLabel: "10 Property",
    Icon: Home,
  },
  {
    name: "Land/Plot",
    countLabel: "02 Property",
    Icon: MapPin,
  },
  {
    name: "Townhouse",
    countLabel: "05 Property",
    Icon: Building,
  },
  {
    name: "Penthouse",
    countLabel: "02 Property",
    Icon: Landmark,
  },
  {
    name: "Cottage",
    countLabel: "11 Property",
    Icon: Warehouse,
  },
];

const CategoriesSection = () => {
  return (
    <section className="w-full bg-[#FBF7F5] py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-rose-500">
            {/* <span className="h-[1px] w-8 bg-rose-500" />
            <span>Categories</span> */}
            <p className="text-red-500 font-semibold  uppercase tracking-[0.3em]">
              — Categories —
            </p>
          </div>

          <h2 className="mt-2 text-center text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl mb-[30px]">
            Choose Your Property Type
          </h2>
        </div>

        {/* Category Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((item) => (
            <button
              key={item.name}
              className="mt-[19px] md:mt-0 lg:mt-0 group relative flex flex-col items-center rounded-3xl bg-white px-6 pb-6 pt-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              {/* Icon Circle */}
              <div className="relative -mt-17 mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white ring-1 ring-slate-100 shadow-sm">
                {/* <span className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-rose-400/40" /> */}
                <item.Icon className="relative h-10 w-[30px] text-slate-900 group-hover:text-rose-500" />
              </div>

              <div className="text-center">
                <p className="text-base font-semibold text-slate-900 sm:text-lg">
                  {item.name}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {item.countLabel}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
