import { compareDesc } from 'date-fns'
import { getCollection } from 'astro:content';

export async function getAllPosts() {
    const posts = await getCollection('posts', ({data}) => !data.draft)
    return posts.map(post => {
        const data = post.data;
        const cat = data.categories ?? (data.category ? [data.category] : [])
        const tags = data.tags || []
        return {
            tags: [...new Set<string>([...cat, ...tags])].sort(),
            ...post
        }
    })
}

export async function getSortedPostsData(lang: string, tag?: string) {
    const allPosts = await getAllPosts();
    const allPostsData = allPosts
        .filter(post => {
            const [language, ..._] = post.slug.split('/');
            return language === lang
        })
        .sort((a, b) => compareDesc(a.data.date, b.data.date))

    if (tag) {
        return allPostsData.filter(post => post.tags?.includes(tag))
    } else {
        return allPostsData;
    }
}

export async function getTags(lang: string) {
    const cnt = (await getSortedPostsData(lang)).reduce((cnt, post) => {
        if (!post.tags) return cnt;
        for (let tag of post.tags) {
            if (cnt[tag]) {
                cnt[tag]++;
            } else {
                cnt[tag] = 1;
            }
        }
        return cnt;
    }, {})

    const sorted = Object.entries(cnt).sort((a, b) => {
        return a[0] < b[0] ? -1 : 1
    })

    return sorted;
}
