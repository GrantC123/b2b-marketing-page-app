import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@bankrate/icons-react", "radix-ui"],
  },
  async redirects() {
    return [
      {
        source: "/rate-table-preview",
        destination: "/rate-table-preview.html",
        permanent: false,
      },
      {
        source: "/savings-accounts-preview",
        destination: "/savings-accounts-preview.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
