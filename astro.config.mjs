// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/static";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://vtuber.icu",
  integrations: [mdx(), sitemap(), svelte()],
  output: "static",
  adapter: vercel(),
  image: {
    domains: ["i0.hdslb.com"], // 允许的远程图片域名
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.hdslb.com", // 允许所有hdslb.com的子域名
      },
    ],
  },
});
