import { Home, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050910] text-slate-100 pt-12 pb-6">
      <div className="mx-auto max-w-[1600px] px-4">
        {/* Top grid */}
        <div className="grid gap-8 md:grid-cols-5 lg:grid-cols-5">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About MetroNest</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              MetroNest is your modern real estate platform – connecting buyers,
              renters, and agents with premium properties in top locations.
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900">
                  <Phone className="h-4 w-4 text-red-500" />
                </span>
                <span>+00 (123) 456 789 012</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900">
                  <Mail className="h-4 w-4 text-red-500" />
                </span>
                <span>info@metronest.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900">
                  <MapPin className="h-4 w-4 text-red-500" />
                </span>
                <span>West 2nd Lane, Inner Circular Road, New York City</span>
              </div>
            </div>
          </div>

          {/* Featured Houses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured Houses</h3>
            <ul className="space-y-2 text-sm">
              {[
                "#Villa",
                "#Commercial",
                "#Farm Houses",
                "#Apartments",
                "#Penthouses",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-slate-300 hover:text-white"
                  >
                    <Home className="h-4 w-4 text-red-500" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Strategy Services",
                "Management",
                "Privacy & Policy",
                "Sitemap",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-slate-300 hover:text-white"
                  >
                    <Home className="h-4 w-4 text-red-500" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Location */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Help Center",
                  "FAQs",
                  "Contact Us",
                  "Ticket Support",
                  "Live Chat",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-slate-300 hover:text-white"
                    >
                      <Home className="h-4 w-4 text-red-500" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">MetroNest Location</h3>
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              {/* Replace src with your real map embed if you want */}
              <iframe
                title="MetroNest Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193571.4385338994!2d-74.11808670728716!3d40.70582543795581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzIxLjAiTiA3NMKwMDcnMTYuMCJX!5e0!3m2!1sen!2sus!4v1700000000000"
                className="h-40 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MetroNest. All rights reserved.</p>
          <p className="text-slate-600">Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
