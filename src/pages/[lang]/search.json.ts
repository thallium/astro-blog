import type { APIRoute } from "astro";
import { getSortedPostsData } from "src/lib/posts";
import { LANGS } from "src/site-config";

import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";

export default function extractContent(raw_content: string) {
  // return content
  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkMath)
    .use(remarkGfm)
    // .processSync(content)
    .parse(raw_content);

  let content = "";

  // use dfs to extract text and code from the ast
  const dfs = (node) => {
    if (node.type === "text") {
      content += node.value;
      // } else if (node.type === "code") {
      //   content += node.value;
    } else if (node.children) {
      node.children.forEach((child) => dfs(child));
    }
  };

  dfs(tree);

  return content;
}
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang;
  const posts = await getSortedPostsData(lang);
  const index = posts.map((post) => {
    const content = extractContent(post.body);
    return {
      title: post.data.title,
      content,
      url: `/${lang}/post/${post.slug.split("/")[1]}`,
    };
  });

  return Response.json(index);
};

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}
