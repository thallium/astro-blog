// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const TITLE = "Thallium54";
export const DESCRIPTION = "The place where I post something about myself.";
export const AUTHOR = "Thallium54";
export const POST_PER_PAGE = 7;
export const LANGS = ['en', 'zh'];
export const FOOTER = "© 2023 Powered by Astro | Theme inspired by Tokyo Night"

export const siteMetadata = {
    title: "Thallium54",
    author: 'Thallium54',
    description: "The place where I post something about myself."
}

type LanguageConfig = {
    [key: string]: {
        name: string,
        langCode: string,
        dict: {
            [key: string]: string
        },
        navLinks: {
            href: string,
            title: string
        }[]
    }
}

export const languages: LanguageConfig = {
    en: {
        name: "English",
        langCode: "en",
        dict: {
            recentPosts: "Recent Posts",
            tags: "Tags",
        },
        navLinks: [
            { href: '/posts', title: 'Posts' },
            { href: '/tags', title: 'Tags' },
        ]
    },
    zh: {
        name: "中文",
        langCode: "zh-hans",
        dict: {
            recentPosts: "最近文章",
            tags: "标签",
        },
        navLinks: [
            { href: '/posts', title: '文章' },
            { href: '/tags', title: '标签' },
        ]
    },
}
