"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { Bath, Bed, Heart, MapPin, Ruler } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Charming Beach House",
    location: "39581 Rohan Estates, New York",
    price: "$179,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr.png",
  },
  {
    id: 2,
    title: "Contemporary Loft",
    location: "39581 Rohan Estates, New York",
    price: "$335,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr2.png",
  },
  {
    id: 3,
    title: "Cozy Cottage",
    location: "39581 Rohan Estates, New York",
    price: "$250,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr3.png",
  },
  {
    id: 4,
    title: "Modern Beach House",
    location: "39581 Rohan Estates, New York",
    price: "$189,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr4.png",
  },
  {
    id: 1,
    title: "Charming Beach House",
    location: "39581 Rohan Estates, New York",
    price: "$179,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr.png",
  },
  {
    id: 5,
    title: "Contemporary Loft",
    location: "39581 Rohan Estates, New York",
    price: "$335,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr2.png",
  },
  {
    id: 6,
    title: "Cozy Cottage",
    location: "39581 Rohan Estates, New York",
    price: "$250,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr3.png",
  },
  {
    id: 7,
    title: "Modern Beach House",
    location: "39581 Rohan Estates, New York",
    price: "$189,800.00",
    beds: 4,
    baths: 2,
    sqft: 1500,
    image: "/images/pr4.png",
  },
];

export default function PropertyCarousel() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-[1600px] px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="text-red-500 font-semibold uppercase tracking-[0.2em]">
            — Popular Properties —
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-black">
            Best Properties Sale
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={25}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <div className="rounded-xl bg-white shadow-md overflow-hidden  hover:shadow-xl transition">
                {/* Image Wrapper */}
                <div className="relative h-64 w-full">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />

                  {/* For Sale tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 text-white px-3 py-1 text-xs rounded-md font-semibold">
                      For Sale
                    </span>
                  </div>

                  {/* Heart Icon */}
                  <button className="absolute top-3 right-3 bg-white/70 hover:bg-white text-gray-500 p-2 rounded-full shadow-md">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-black">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span>{property.location}</span>
                  </div>

                  {/* Icons Row */}
                  <div className="flex justify-between py-4 border-y mt-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>Bed {property.beds}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>Bath {property.baths}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-semibold text-black">
                      {property.price}
                    </p>

                    <Link
                      href="#"
                      className="border px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition text-black"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
