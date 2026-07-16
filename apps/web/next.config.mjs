import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@travator/shared"],
  reactStrictMode: true,
  images: {
    // Marketing imagery is grayscale-filtered; remote placeholders allowed.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
