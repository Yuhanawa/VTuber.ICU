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
});
