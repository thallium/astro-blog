---
title: "又一次博客搬迁"
date: 2023-12-11T21:41:42.593Z
tags: ["Nextjs"]
summary: ""
keywords: ["Next.js", "博客"]
---

没想到离[上次换主题](/zh/post/switch-to-hello-friend)只过了一年（上次还说希望能用久一点 hhh）。不过这次的原因也有点不一样。其实之前一直对 Hugo 有些怨言，比如说过于复杂、编辑器支持不好、过于依赖别人的主题，想改一些东西的话就很麻烦，总之就是毕竟用的别人的东西，上次也提到过想自己用 Hugo 做一个，但是看了一会文档就被劝退了。最近因为上课学了一下 Nextjs，于是就想能不能用 Nextjs 做一个博客，上 YouTube 找了一个教程感觉核心原理也不复杂，于是决定开干，没想到这一干就是好几周，其中大部分时间应该在研究各种解决方案，网上的参考资料不多，所以决定还是记录一下以便别人参考。

## 内容管理

一开始秉承着尽量少用第三方库的原则，就采用了教程中直接读取对应文件的做法，但是一大缺点就是 dev 模式中文件更新后网页不能自动更新，必须要要手动刷新，这样就给写作时预览增加了很大不便，最后决定采用[Contentlayer](https://contentlayer.dev/)，同时还有一些别的好处比如 frontmatter 检查、`onSuccess` hook 可以用来生成搜索索引（后面会提到，这其实是让我决定用 Contentlayer 的原因，因为自己实现实在是有点麻烦）。

## MDX

Hugo 的 shortcodes 功能可以利用写好的模板生成 HTML，从而实现一些自定义组件。不用 Hugo 之后必然要想一种替代方案，一开始是想利用 markdown directives 然后自己写 rehype 插件，但是在插件里添加 HTML 实在不如写 JSX 体验好，最终还是决定用 MDX。最终的解决方案是用 [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) 渲染 Markdown/MDX，值得一提的是该包目前还不支持 MDX v3 所以有些 remark 插件（rehype-math, remark-gfm）需要使用老版本。

## 搜索

搜索大概是我花时间最多的部分了，最终的解决方案是利用 contentlayer 的 `onSuccess` hook，在 markdown 处理完成之后再利用 remark 将 markdown 转成语法树并提取其中的文字以生成索引。网页端则用 [FlexSearch](https://github.com/nextapps-de/flexsearch) 搜索，并在 shadcn/ui 中的 [Command](https://ui.shadcn.com/docs/components/command) 组件里显示搜索结果。

## UI

Tailwind CSS 是必须的。一开始组件库用的 DaisyUI，但毕竟是基于 CSS 的组件库，必然有一些限制，比如下拉菜单只能点其他地方关掉，再加上做搜索的时候用了 shadcn 所以最后还是花了不少时间换成 shadcn 的组件。

配色的话一开始继续沿用的 hello-friend 的颜色，但是暗色模式下一直找不到一个比较匹配的代码高亮主题。后来突然想到 Tailwind 用了 oklch 所以学习了一下并发现可以比较容易调出一套色板，于是花了一上午基于 Tokyo Night 的颜色做了一套颜色，最终还是比较满意的，感觉自己是设计师了嘿嘿。

以上大概就是能想到的比较重要的部分了，以后要是想到别的会继续补充。
