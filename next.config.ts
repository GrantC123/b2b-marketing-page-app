import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@bankrate/icons-react", "radix-ui"],
  },
};

export default nextConfig;
