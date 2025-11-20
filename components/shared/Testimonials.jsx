"use client";

import "swiper/css";
import "swiper/css/pagination";

import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    id: 1,
    name: "Julia Era",
    role: "Property owner",
    avatar: "/images/about/ava1.avif", // 👉 replace with your image path
    text: "Tenax comitatus ambulo regnum eligo, conturbo vis caelum cohors. Infit ustulo adoptio collum, speciosus lumen soluta. Condico spiculum ratio, sopor conventus adversus fiducia. Arma accesso altaria impleo pax laboriosus. Trepide asporto momentum, virgo sollemne aurora amo.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Investor",
    avatar: "/images/about/ava2.avif",
    text: "Cedo umquam cedo summisse damnum reiciendis veritas flamma. Tempus appono validus translatio, exemplum adnuo sponte voluntas radius caecus exsisto.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        {/* Top label */}
        <div className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#f05454]">
          <span className="h-px w-6 bg-[#f05454]" />
          <span>Testimonials</span>
          <span className="h-px w-6 bg-[#f05454]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl md:text-[32px]">
          What Clients Say About Pillar
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="mt-10 w-full !pb-10"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center">
              <div className="flex max-w-4xl flex-col items-center text-center">
                {/* Quote icon */}
                <Quote className="mb-6 h-10 w-10 text-rose-300" />

                {/* Text */}
                <p className="text-sm font-medium leading-relaxed text-slate-900 sm:text-base md:text-[15px]">
                  “{item.text}”
                </p>

                {/* Stars */}
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Avatar + name */}
                <div className="mt-5 flex flex-col items-center">
                  <div className="relative mb-3 h-16 w-16 rounded-full border-[3px] border-[#f05454] bg-white p-1 shadow-md">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
