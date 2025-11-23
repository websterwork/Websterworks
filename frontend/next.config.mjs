/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allowlist external image hosts used across the app (gravatar, cloudinary, etc.)
    domains: [
      'res.cloudinary.com',
      'www.gravatar.com',
      'secure.gravatar.com',
      'avatars.githubusercontent.com',
    ],
    formats: [ 'image/avif', 'image/webp' ],
  },
  // small performance-related defaults; further tuning possible
  // Note: `experimental.images` key caused Next.js warning in some versions —
  // remove it to avoid unrecognized key warnings. If you need future image
  // flags, add them according to the Next.js version docs.
};

export default nextConfig;
