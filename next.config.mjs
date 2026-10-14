const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Hay dos root layouts (es/en); el 404 se arma en app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
