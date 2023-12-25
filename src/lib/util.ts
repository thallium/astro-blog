import { CollectionEntry } from "astro:content"
import { LANGS } from "src/site-config"
import { languages } from "src/site-config"

export function generateByLang(f: (lang: string) => any[]) {
    const allParams = LANGS.flatMap(lang => {
        return f(lang)
    })

    return allParams
}

export function translate(lang: string, key: string) {
    return languages[lang].dict[key];
}

export async function asyncFlatMap<T, U>(arr: T[], f: (t: T) => Promise<U[]>): Promise<U[]> {
    return (await Promise.all(arr.map(f))).flat()
}

type Post = CollectionEntry<"posts"> & { tags: string[] };
export type { Post }
