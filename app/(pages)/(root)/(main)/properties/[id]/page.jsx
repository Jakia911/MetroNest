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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const floorTabs = ["First Floor", "Second Floor", "Third Floor", "Top Garden"];

// Contact Form Component
function ContactForm({ propertyId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          propertyId: propertyId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error sending message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-xs">
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
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[#444] placeholder:text-[#444] outline-none focus:border-[#f05454] focus:ring-1 focus:ring-[#f05454]/20"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f05454] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#e14343] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Mail className="h-3.5 w-3.5" />
        {submitting ? "Sending..." : "Send Us"}
      </button>
    </form>
  );
}

export default function PropertyDetailsPage({ params }) {
  const propertyId = params.id;
  const [property, setProperty] = useState(null);
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeFloor, setActiveFloor] = useState(floorTabs[0]);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/${propertyId}`);
        const result = await response.json();

        if (result.success) {
          setProperty(result.data);
        } else {
          toast.error(result.error || "Property not found");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Error loading property");
      } finally {
        setLoading(false);
      }
    };

    // Fetch featured listings for sidebar
    const fetchFeaturedListings = async () => {
      try {
        const response = await fetch("/api/properties?featured=true&limit=3");
        const result = await response.json();
        if (result.success) {
          setFeaturedListings(result.data);
        }
      } catch (error) {
        console.error("Error fetching featured listings:", error);
      }
    };

    if (propertyId) {
      fetchProperty();
      fetchFeaturedListings();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-slate-600">Loading property...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-slate-600">Property not found</div>
      </div>
    );
  }

  const images =
    property.images && property.images.length > 0
      ? property.images
      : property.mainImage
      ? [property.mainImage]
      : ["/images/pr.png"];

  // Build highlights from property data
  const highlights = property.highlights
    ? [
        { label: "ID NO.", value: property.highlights.idNo || "N/A" },
        { label: "Type", value: property.type || "Residential" },
        {
          label: "Room",
          value: String(property.highlights.room || property.beds || 0),
        },
        {
          label: "Bedroom",
          value: String(property.highlights.bedroom || property.beds || 0),
        },
        {
          label: "Bath",
          value: String(property.highlights.bath || property.baths || 0),
        },
        {
          label: "Big Yard",
          value: property.highlights.bigYard ? "Yes" : "No",
        },
        { label: "Parking", value: property.highlights.parking || "N/A" },
        { label: "Jacuzzi", value: property.highlights.jacuzzi ? "Yes" : "No" },
        { label: "Pool", value: property.highlights.pool ? "Yes" : "No" },
        { label: "Heating", value: property.highlights.heating || "N/A" },
      ]
    : [];

  const amenities =
    property.amenities && property.amenities.length > 0
      ? property.amenities
      : [];

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
                <span>{formatDate(property.date)}</span>
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
              {featuredListings.length === 0 ? (
                <p className="text-xs text-slate-500">No featured listings</p>
              ) : (
                featuredListings
                  .filter((item) => item._id !== property._id)
                  .slice(0, 3)
                  .map((item) => (
                    <Link
                      href={`/properties/${item._id}`}
                      key={item._id}
                      className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-2.5 text-xs hover:border-[#f05454]/60"
                    >
                      <div className="relative h-16 w-20 overflow-hidden rounded-xl">
                        <Image
                          src={
                            item.mainImage ||
                            item.images?.[0] ||
                            "/images/pr.png"
                          }
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
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Contact Us
            </h3>

            <ContactForm propertyId={property._id} />
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
