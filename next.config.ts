import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  /* config options here */
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;



// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
//   reactCompiler: true,
// };

// export default nextConfig;