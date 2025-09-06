import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com", // Firebase example
      "res.cloudinary.com",             // Cloudinary example
      "example.com"                     // any other image domain
    ],
  },
};

export default nextConfig;
