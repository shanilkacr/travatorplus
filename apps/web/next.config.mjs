import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@travator/shared"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) =>
        typeof rule === "object" &&
        rule !== null &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );

    if (fileLoaderRule && typeof fileLoaderRule === "object") {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /url/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
              titleProp: true,
              ref: true,
            },
          },
        ],
      }
    );

    return config;
  },
};

const withMDX = createMDX({
  options: {
    /*
     * Without remark-frontmatter the YAML block is not recognised, and the
     * closing `---` makes markdown read the whole block as a setext heading —
     * so every post rendered its own frontmatter as a giant <h2>.
     * Metadata is read separately via gray-matter in lib/blog.ts.
     */
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
