const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const transpilePackages = ["@oxygen/design-system", "@oxygen/llm"];

const protocol = "https";

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "",
  cleanDistDir: true,
  compress: true,
  // crossOrigin: 'same-origin',
  devIndicators: { buildActivity: true, buildActivityPosition: "bottom-right" },
  distDir: "./.next",
  // env,
  eslint: {
    // @note(eslint) handled outside of next
    ignoreDuringBuilds: true,
  },
  excludeDefaultMomentLocales: true,
  experimental: {
    appDir: false,
    legacyBrowsers: false,
    //esmExternals: "loose",
    //outputFileTracingRoot: path.join(__dirname, "../..")
  },
  transpilePackages,
  httpAgentOptions: {
    keepAlive: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    deviceSizes: [743, 744, 1127, 1128, 1440],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      "**.amazonws.com",
      "**.example.com",
      "**.googleapis.com",
      "**.cloudfront.net",
    ],
    remotePatterns: [
      {
        protocol,
        hostname: `**.${
          process.env.NEXT_PUBLIC_SITE ?? process.env.VERCEL_URL ?? ""
        }`,
      },
      // @note(remotePattern) Google Apis
      {
        protocol,
        hostname: `**.googleapis.com`,
      },
      // @note(remotePattern) Future proofing "other" websites
      {
        protocol,
        hostname: `**.example.com`,
      },
      // @note(remotePattern) AWS
      {
        protocol,
        hostname: `**.amazonaws.com`,
      },
      // @note(remotePattern) Twitter
      {
        protocol,
        hostname: `pbs.twimg.com`,
      },
      // @note(remotePattern) Unsplash
      {
        protocol,
        hostname: `images.unsplash.com`,
      },
      // @note(remotePattern) Picsum
      {
        protocol,
        hostname: `picsum.photos`,
      },
      // @note(remotePattern) Cloudfront
      {
        protocol,
        hostname: `**.cloudfront.net`,
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 18144000, // 1 month
  },
  optimizeFonts: true,
  outputFileTracing: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  typescript: {
    // @note(typescript) handled outside of next
    ignoreBuildErrors: true,
  },
};

/**
 * @note
 * Plugins cannot handle their own Configuration at this time.
 */
const plugins = [withBundleAnalyzer];
module.exports = plugins.reduce((config, plugin) => plugin(config), nextConfig);
