"use client";

import {
  Bath,
  BedDouble,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Same base properties so id/title/price stay in sync with cards
const properties = [
  {
    id: 1,
    title: "Charming Beach House",
    address: "39581 Rohan Estates, New York",
    price: 5805,
    beds: 4,
    baths: 2,
    area: 1500,
    status: "Featured",
    date: "05 Jun, 2024",
    commentsCount: 0,
    mainImage: "/images/pr.png",
    images: [
      "/images/pr.png",
      "/images/pr2.png",
      "/images/pr3.png",
      "/images/pr4.png",
      "/images/pr5.png",
      "/images/pr2.png",
    ],
  },
  {
    id: 2,
    title: "Contemporary Loft",
    address: "39581 Rohan Estates, New York",
    price: 8850,
    beds: 4,
    baths: 2,
    area: 1959,
    status: "Featured",
    date: "12 Jul, 2024",
    commentsCount: 3,
    mainImage: "/images/pr2.png",
    images: [
      "/images/pr2.png",
      "/images/pr3.png",
      "/images/pr4.png",
      "/images/pr5.png",
      "/images/pr.png",
    ],
  },
  // add more if you want, they’ll fall back to first if id not found
];

const highlights = [
  { label: "ID NO.", value: "#45231" },
  { label: "Type", value: "Residential" },
  { label: "Room", value: "4" },
  { label: "Bedroom", value: "3" },
  { label: "Bath", value: "2" },
  { label: "Big Yard", value: "Yes" },
  { label: "Parking", value: "2 Cars" },
  { label: "Jacuzzi", value: "Yes" },
  { label: "Pool", value: "Yes" },
  { label: "Heating", value: "Central" },
];

const amenities = [
  "Airconditioning",
  "Balcony",
  "Garage",
  "Lawn",
  "Microwave",
  "Outdoor Kitchen",
  "Refrigerator",
  "Washer",
  "Wi-Fi",
  "Security",
  "Jacuzzi",
  "Indoor Games",
  "Gym",
  "Sauna",
  "Dishwasher",
  "Smart Locks",
];

const floorTabs = ["First Floor", "Second Floor", "Third Floor", "Top Garden"];

const featuredSidebarListings = [
  {
    id: 1,
    title: "Cometes Contabesco Audacia Aeneus Tui Canonicus",
    beds: 2,
    baths: 2,
    area: 1959,
    price: 9850,
    image: "/images/pr.png",
  },
  {
    id: 2,
    title: "Cometes Contabesco Audacia Aeneus Tui Canonicus",
    beds: 2,
    baths: 2,
    area: 1959,
    price: 8850,
    image: "/images/pr2.png",
  },
  {
    id: 3,
    title: "Cometes Contabesco Audacia Aeneus Tui Canonicus",
    beds: 2,
    baths: 2,
    area: 1959,
    price: 7850,
    image: "/images/pr3.png",
  },
];

export default function PropertyDetailsPage({ params }) {
  const propertyId = Number(params.id);
  const property = properties.find((p) => p.id === propertyId) || properties[0];

  const [activeImage, setActiveImage] = useState(0);
  const [activeFloor, setActiveFloor] = useState(floorTabs[0]);

  const images = property.images || [property.mainImage];

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = (amount) =>
    amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  return (
    <section className="w-full bg-[#f5f7fb] py-10 md:py-16">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-4 lg:flex-row lg:px-0">
        {/* MAIN COLUMN */}
        <div className="w-full lg:w-[68%]">
          {/* Image gallery */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
            {/* main image */}
            <div className="relative h-[260px] w-full overflow-hidden rounded-t-3xl sm:h-[340px] md:h-[420px]">
              <Image
                src={images[activeImage]}
                alt={property.title}
                fill
                className="object-cover"
              />

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-[#f05454] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-[#f05454] hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* thumbs row */}
            <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-4 py-3 sm:px-6">
              <button
                onClick={handlePrevImage}
                className="hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-[#f05454] hover:text-white sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex flex-1 gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-16 min-w-[84px] flex-1 overflow-hidden rounded-xl border text-left transition ${
                      idx === activeImage
                        ? "border-[#f05454]"
                        : "border-slate-100 hover:border-[#f05454]/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextImage}
                className="hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-[#f05454] hover:text-white sm:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="inline-flex items-center rounded-full bg-[#f05454]/10 px-3 py-1 text-xs font-semibold text-[#f05454]">
                Featured
              </span>

              <div className="flex items-center gap-1 text-slate-500">
                <Calendar className="h-3.5 w-3.5 text-[#f05454]" />
                <span>{property.date}</span>
              </div>

              <div className="flex items-center gap-1 text-slate-500">
                <MessageCircle className="h-3.5 w-3.5 text-[#f05454]" />
                <span>
                  {property.commentsCount === 0
                    ? "No Comments"
                    : `${property.commentsCount} Comments`}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-rose-50 hover:text-rose-500"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          {/* About + price */}
          <div className="mt-6 flex flex-col border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                About This Property
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-[#f05454]" />
                <span className="font-medium">{property.address}</span>

                <span className="hidden h-3 w-px bg-slate-200 sm:inline-block" />
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3.5 w-3.5 text-slate-400" />
                  Bed {property.beds}
                </span>
                <span className="hidden h-3 w-px bg-slate-200 sm:inline-block" />
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5 text-slate-400" />
                  Bath {property.baths}
                </span>
                <span className="hidden h-3 w-px bg-slate-200 sm:inline-block" />
                <span className="flex items-center gap-1">
                  <Maximize2 className="h-3.5 w-3.5 text-slate-400" />
                  {property.area} sqft
                </span>
              </div>
            </div>

            <p className="mt-3 text-xl font-semibold tracking-tight text-slate-900 sm:mt-0 sm:text-2xl">
              {formatPrice(property.price)}
            </p>
          </div>

          {/* Description */}
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              This meticulously remodeled “Savant Smart Home” is a true gem.
              Featuring four bedrooms and three bathrooms, including a master
              with a jacuzzi tub, walk-in shower, and steam room, it combines
              style with cutting-edge technology. The open living and dining
              areas lead to a chef’s kitchen equipped with premium appliances
              and sleek cabinetry.
            </p>
            <p>
              High-end lighting and automation bring sophistication and comfort
              throughout. Outdoors, enjoy a heated saltwater pool with spa, a
              cabana bath, and an outdoor kitchen/bar pergola. The fully-fenced
              front yard also features a putting green.
            </p>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur.
            </p>
          </div>

          {/* Property Highlights */}
          <div className="mt-8 rounded-3xl bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                Property Highlights
              </h2>
              <span className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                House for sale
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4 lg:grid-cols-5">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-start rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <span className="text-[11px] font-medium text-slate-500">
                    {item.label}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Amazing Gallery */}
          <div className="mt-8">
            <h2 className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">
              From Amazing Gallery
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.slice(0, 6).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-32 overflow-hidden rounded-2xl sm:h-40"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Features & amenities */}
          <div className="mt-8">
            <h2 className="mb-3 text-base font-semibold text-slate-900 sm:text-lg">
              Features & amenities
            </h2>
            <div className="grid grid-cols-2 gap-y-2 text-xs sm:grid-cols-3 lg:grid-cols-4">
              {amenities.map((a) => (
                <label
                  key={a}
                  className="inline-flex items-center gap-2 text-slate-600"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#f05454] focus:ring-[#f05454]"
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Floor Plan */}
          <div className="mt-8 rounded-3xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">
              Floor Plan
            </h2>

            {/* tabs */}
            <div className="mb-5 flex flex-wrap gap-2 text-xs">
              {floorTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFloor(tab)}
                  className={`rounded-full border px-4 py-1.5 font-medium transition ${
                    activeFloor === tab
                      ? "border-[#f05454] bg-[#f05454]/10 text-[#f05454]"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-[#f05454]/40"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-1/2">
                {/* You can replace this with a real floor plan image */}
                <Image
                  src="/images/floor/floor.jpg"
                  alt="Floor Plan"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="sm:w-1/2">
                <h3 className="text-sm font-semibold text-slate-900">
                  {activeFloor}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Donec egestas, lectus sit amet semper varius, magna ipsum
                  gravida elit, in luctus arcu elit vel leo. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere
                  cubilia curae; Morbi eget dolor at dui pharetra pellentesque.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Curabitur dictum velit sed quam convallis, eget tristique
                  risus fermentum. Duis vel magna vitae mauris malesuada
                  consequat.
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mt-8">
            <h2 className="mb-3 text-base font-semibold text-slate-900 sm:text-lg">
              Location
            </h2>
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              {/* Static Google map embed example – replace with your own key if needed */}
              <iframe
                title="Property Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9754576191327!2d-73.9851304845937!3d40.75889697932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTknMDcuMCJX!5e0!3m2!1sen!2sus!4v1615169172743!5m2!1sen!2sus"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* SIDEBAR COLUMN */}
        <aside className="w-full space-y-6 lg:w-[32%]">
          {/* Search card */}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Search
            </h3>
            <form className="flex h-10 items-center rounded-full border border-slate-200 bg-slate-50 px-3">
              <input
                type="text"
                placeholder="Enter Keyword"
                className="flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f05454] text-white shadow-sm hover:bg-[#e14343]"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* Featured listings sidebar */}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Featured Listings
            </h3>
            <div className="space-y-4">
              {featuredSidebarListings.map((item) => (
                <Link
                  href={`/properties/${item.id}`}
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-2.5 text-xs hover:border-[#f05454]/60"
                >
                  <div className="relative h-16 w-20 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <p className="line-clamp-2 font-semibold text-[11px] text-slate-900">
                      {item.title}
                    </p>
                    <div className="mt-1 flex items-center flex-wrap gap-2 text-[10px] text-slate-500">
                      <span>Bed {item.beds}</span>
                      <span className="h-3 w-px bg-slate-200" />
                      <span>Bath {item.baths}</span>
                      <span className="h-3 w-px bg-slate-200" />
                      <span>{item.area} sqft</span>
                    </div>
                    <p className="mt-1 text-[11px] font-semibold text-[#f05454]">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Contact Us
            </h3>

            <form className="space-y-3 text-xs">
              {/* Name */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-name"
                  className="text-[11px] font-medium text-slate-700 mb-[10px] block"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[#444] placeholder:text-[#444] outline-none focus:border-[#f05454] focus:ring-1 focus:ring-[#f05454]/20"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-email"
                  className="text-[11px] font-medium text-slate-700 mb-[10px] block"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[#444] placeholder:text-[#444] outline-none focus:border-[#f05454] focus:ring-1 focus:ring-[#f05454]/20"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-phone"
                  className="text-[11px] font-medium text-slate-700 mb-[10px] block"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[#444] placeholder:text-[#444] outline-none focus:border-[#f05454] focus:ring-1 focus:ring-[#f05454]/20"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-message"
                  className="text-[11px] font-medium text-slate-700 mb-[10px] block"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  placeholder="Write your message"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[#444] placeholder:text-[#444] outline-none focus:border-[#f05454] focus:ring-1 focus:ring-[#f05454]/20"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f05454] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#e14343]"
              >
                <Mail className="h-3.5 w-3.5" />
                Send Us
              </button>
            </form>
          </div>

          {/* CTA card */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-md">
            <div className="relative h-90 w-full">
              <Image
                src="/images/pr4.png"
                alt="We can help you"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2845]/90 via-[#0b2845]/70 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
                Real Estate Support
              </p>
              <h3 className="mt-1 text-sm font-semibold leading-snug">
                We can help you to find real estate agency
              </h3>
              <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#f05454]">
                <Phone className="h-3.5 w-3.5" />
                Contact With Agent
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
