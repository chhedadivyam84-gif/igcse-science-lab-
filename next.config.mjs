/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM examples; Next handles this natively but we
  // keep the package list explicit so tree-shaking works in the server build.
  transpilePackages: ['three'],
  experimental: {
    // Keeps the 3D + animation bundles out of the initial server compile graph.
    optimizePackageImports: ['framer-motion', '@react-three/drei', 'lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
