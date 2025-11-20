import connectDB from "./connect.js";
import { Category, Property, Testimonial } from "./models/index.js";

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await Property.deleteMany({});
    await Category.deleteMany({});
    await Testimonial.deleteMany({});
    console.log("Cleared existing data");

    // Seed Categories
    const categories = [
      {
        name: "Apartment",
        slug: "apartment",
        description: "Modern apartments in prime locations",
        propertyCount: 0,
      },
      {
        name: "Commercial",
        slug: "commercial",
        description: "Commercial properties for business",
        propertyCount: 0,
      },
      {
        name: "Land Or Plot",
        slug: "land-or-plot",
        description: "Land and plot properties",
        propertyCount: 0,
      },
      {
        name: "Farm",
        slug: "farm",
        description: "Farm properties and estates",
        propertyCount: 0,
      },
      {
        name: "Villa",
        slug: "villa",
        description: "Luxury villas",
        propertyCount: 0,
      },
      {
        name: "House",
        slug: "house",
        description: "Family houses",
        propertyCount: 0,
      },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Seed Properties
    const properties = [
      {
        title: "Charming Beach House",
        address: "39581 Rohan Estates, New York",
        price: 179800,
        beds: 4,
        baths: 2,
        area: 1500,
        status: "For Sale",
        type: "Apartment",
        description:
          "This meticulously remodeled 'Savant Smart Home' is a true gem. Featuring four bedrooms and three bathrooms, including a master with a jacuzzi tub, walk-in shower, and steam room, it combines style with cutting-edge technology.",
        mainImage: "/images/pr.png",
        images: [
          "/images/pr.png",
          "/images/pr2.png",
          "/images/pr3.png",
          "/images/pr4.png",
          "/images/pr5.png",
          "/images/pr2.png",
        ],
        featured: true,
        highlights: {
          idNo: "#45231",
          room: 4,
          bedroom: 3,
          bath: 2,
          bigYard: true,
          parking: "2 Cars",
          jacuzzi: true,
          pool: true,
          heating: "Central",
        },
        amenities: [
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
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-06-05"),
        commentsCount: 0,
      },
      {
        title: "Contemporary Loft",
        address: "39581 Rohan Estates, New York",
        price: 335800,
        beds: 4,
        baths: 2,
        area: 1500,
        status: "For Sale",
        type: "Commercial",
        description:
          "Modern contemporary loft with open spaces and high ceilings. Perfect for modern living with all amenities included.",
        mainImage: "/images/pr2.png",
        images: [
          "/images/pr2.png",
          "/images/pr3.png",
          "/images/pr4.png",
          "/images/pr5.png",
          "/images/pr.png",
        ],
        featured: true,
        highlights: {
          idNo: "#45232",
          room: 4,
          bedroom: 4,
          bath: 2,
          bigYard: false,
          parking: "1 Car",
          jacuzzi: false,
          pool: false,
          heating: "Central",
        },
        amenities: [
          "Airconditioning",
          "Balcony",
          "Garage",
          "Microwave",
          "Refrigerator",
          "Washer",
          "Wi-Fi",
          "Security",
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-07-12"),
        commentsCount: 3,
      },
      {
        title: "Cozy Cottage",
        address: "39581 Rohan Estates, New York",
        price: 250800,
        beds: 4,
        baths: 2,
        area: 1500,
        status: "For Sale",
        type: "Land Or Plot",
        description:
          "Beautiful cozy cottage in a peaceful neighborhood with garden and modern amenities.",
        mainImage: "/images/pr3.png",
        images: ["/images/pr3.png", "/images/pr4.png", "/images/pr5.png"],
        featured: false,
        highlights: {
          idNo: "#45233",
          room: 4,
          bedroom: 4,
          bath: 2,
          bigYard: true,
          parking: "2 Cars",
          jacuzzi: false,
          pool: false,
          heating: "Central",
        },
        amenities: [
          "Airconditioning",
          "Lawn",
          "Garage",
          "Refrigerator",
          "Washer",
          "Wi-Fi",
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-08-15"),
        commentsCount: 0,
      },
      {
        title: "Modern Beach House",
        address: "39581 Rohan Estates, New York",
        price: 295400,
        beds: 4,
        baths: 2,
        area: 1500,
        status: "For Sale",
        type: "Farm",
        description:
          "Stunning modern beach house with ocean views and luxury amenities.",
        mainImage: "/images/pr4.png",
        images: ["/images/pr4.png", "/images/pr5.png", "/images/pr.png"],
        featured: true,
        highlights: {
          idNo: "#45234",
          room: 4,
          bedroom: 3,
          bath: 2,
          bigYard: true,
          parking: "3 Cars",
          jacuzzi: true,
          pool: true,
          heating: "Central",
        },
        amenities: [
          "Airconditioning",
          "Balcony",
          "Garage",
          "Lawn",
          "Outdoor Kitchen",
          "Refrigerator",
          "Washer",
          "Wi-Fi",
          "Security",
          "Jacuzzi",
          "Gym",
          "Sauna",
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-09-20"),
        commentsCount: 0,
      },
      {
        title: "Cozy Mountain Cabin",
        address: "39581 Rohan Estates, New York",
        price: 310200,
        beds: 4,
        baths: 2,
        area: 1500,
        status: "For Sale",
        type: "Villa",
        description:
          "Beautiful mountain cabin with rustic charm and modern comforts.",
        mainImage: "/images/pr5.png",
        images: ["/images/pr5.png", "/images/pr.png", "/images/pr2.png"],
        featured: false,
        highlights: {
          idNo: "#45235",
          room: 4,
          bedroom: 4,
          bath: 2,
          bigYard: true,
          parking: "2 Cars",
          jacuzzi: false,
          pool: false,
          heating: "Fireplace",
        },
        amenities: [
          "Airconditioning",
          "Lawn",
          "Garage",
          "Refrigerator",
          "Washer",
          "Wi-Fi",
          "Security",
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-10-10"),
        commentsCount: 0,
      },
      {
        title: "Modern Apartment",
        address: "39581 Rohan Estates, New York",
        price: 220900,
        beds: 4,
        baths: 2,
        area: 1500,
        status: "For Sale",
        type: "Apartment",
        description:
          "Modern apartment in the heart of the city with all amenities.",
        mainImage: "/images/pr.png",
        images: ["/images/pr.png", "/images/pr2.png"],
        featured: false,
        highlights: {
          idNo: "#45236",
          room: 4,
          bedroom: 4,
          bath: 2,
          bigYard: false,
          parking: "1 Car",
          jacuzzi: false,
          pool: false,
          heating: "Central",
        },
        amenities: [
          "Airconditioning",
          "Balcony",
          "Garage",
          "Refrigerator",
          "Washer",
          "Wi-Fi",
          "Security",
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-11-05"),
        commentsCount: 0,
      },
      {
        title: "Luxury Penthouse",
        address: "39581 Rohan Estates, New York",
        price: 450000,
        beds: 5,
        baths: 3,
        area: 2500,
        status: "For Sale",
        type: "Apartment",
        description:
          "Luxury penthouse with panoramic city views and premium finishes.",
        mainImage: "/images/pr6.jpg",
        images: ["/images/pr6.jpg", "/images/pr7.webp", "/images/pr8.png"],
        featured: true,
        highlights: {
          idNo: "#45237",
          room: 5,
          bedroom: 5,
          bath: 3,
          bigYard: false,
          parking: "2 Cars",
          jacuzzi: true,
          pool: false,
          heating: "Central",
        },
        amenities: [
          "Airconditioning",
          "Balcony",
          "Garage",
          "Microwave",
          "Refrigerator",
          "Washer",
          "Wi-Fi",
          "Security",
          "Jacuzzi",
          "Gym",
          "Sauna",
          "Smart Locks",
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-12-01"),
        commentsCount: 2,
      },
      {
        title: "Family Home",
        address: "39581 Rohan Estates, New York",
        price: 380000,
        beds: 6,
        baths: 4,
        area: 3000,
        status: "For Sale",
        type: "House",
        description:
          "Spacious family home perfect for large families with beautiful garden.",
        mainImage: "/images/pr7.webp",
        images: ["/images/pr7.webp", "/images/pr8.png", "/images/pr.png"],
        featured: true,
        highlights: {
          idNo: "#45238",
          room: 6,
          bedroom: 6,
          bath: 4,
          bigYard: true,
          parking: "3 Cars",
          jacuzzi: true,
          pool: true,
          heating: "Central",
        },
        amenities: [
          "Airconditioning",
          "Balcony",
          "Garage",
          "Lawn",
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
        ],
        location: {
          lat: 40.7589,
          lng: -73.9851,
        },
        date: new Date("2024-12-15"),
        commentsCount: 1,
      },
    ];

    const createdProperties = await Property.insertMany(properties);
    console.log(`Created ${createdProperties.length} properties`);

    // Update category counts
    for (const category of createdCategories) {
      const count = await Property.countDocuments({ type: category.name });
      await Category.updateOne({ _id: category._id }, { propertyCount: count });
    }

    // Seed Testimonials
    const testimonials = [
      {
        name: "John Smith",
        role: "Home Buyer",
        company: "",
        image: "/images/about/ava1.avif",
        rating: 5,
        comment:
          "MetroNest made finding our dream home so easy! The platform is user-friendly and the properties are exactly as described. Highly recommend!",
        featured: true,
      },
      {
        name: "Sarah Johnson",
        role: "Real Estate Investor",
        company: "",
        image: "/images/about/ava2.avif",
        rating: 5,
        comment:
          "As a real estate investor, I've used many platforms, but MetroNest stands out. Great selection of properties and excellent service.",
        featured: true,
      },
      {
        name: "Michael Chen",
        role: "First-time Buyer",
        company: "",
        image: "/images/about/ava1.avif",
        rating: 5,
        comment:
          "The team at MetroNest guided us through every step. We couldn't be happier with our new home. Thank you!",
        featured: true,
      },
      {
        name: "Emily Davis",
        role: "Property Owner",
        company: "",
        image: "/images/about/ava2.avif",
        rating: 5,
        comment:
          "Listing our property on MetroNest was seamless. We got multiple offers within days. Great platform!",
        featured: false,
      },
    ];

    const createdTestimonials = await Testimonial.insertMany(testimonials);
    console.log(`Created ${createdTestimonials.length} testimonials`);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
