import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import TokyoNight from './src/TokyoNight.json';
import TokyoNightLight from './src/TokyoNightLight.json';

// https://astro.build/config
export default defineConfig({
  site: 'https://tgc54.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  image: {
    domains: ["astro.build", "codeforces.com", "user-images.githubusercontent.com", "cdn.sparkfun.com"]
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [[rehypeKatex, {
      strict: true,
      throwOnError: true
    }], [rehypePrettyCode, {
      theme: {
        dark: TokyoNight,
        light: TokyoNightLight
      }
    }], rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: 'append',
      content: {
        type: 'text',
        value: ' #'
      },
      headingProperties: {
        className: "group"
      },
      properties: {
        ariaHidden: true,
        tabIndex: -1,
        className: "opacity-0 no-underline text-muted-foreground group-hover:opacity-100"
      }
    }]]
  },
  integrations: [mdx(), sitemap(), tailwind({
    applyBaseStyles: false
  })]
});
