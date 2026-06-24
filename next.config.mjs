/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.43.106", "10.240.233.106"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

};

export default nextConfig;
