import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /partner-with-us/index.html so hard refresh works on static hosts (Vercel).
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@bankrate/icons-react", "radix-ui"],
  },
};

export default nextConfig;
