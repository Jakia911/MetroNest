import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
      default: 0,
    },
    baths: {
      type: Number,
      required: true,
      default: 0,
    },
    area: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["For Sale", "For Rent", "Sold", "Rented"],
      default: "For Sale",
    },
    type: {
      type: String,
      enum: [
        "Apartment",
        "Commercial",
        "Land Or Plot",
        "Farm",
        "Villa",
        "House",
      ],
      default: "Apartment",
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    mainImage: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    highlights: {
      idNo: String,
      room: Number,
      bedroom: Number,
      bath: Number,
      bigYard: Boolean,
      parking: String,
      jacuzzi: Boolean,
      pool: Boolean,
      heating: String,
    },
    amenities: {
      type: [String],
      default: [],
    },
    location: {
      lat: Number,
      lng: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
