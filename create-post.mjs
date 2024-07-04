import { writeFileSync } from 'fs'
import YAML from 'yaml'

const postsPath = "src/content/posts"

if (process.argv.length < 4) {
    console.error("Usage: node create-post.mjs <lang> <file-name>")
    process.exit(1)
}

const lang = process.argv[2]
const fileName = process.argv[3]

const frontmatter = {
    title: '',
    date: new Date().toISOString(),
    tags: [],
    summary: "",
    keywords: [],
}

const res = "---\n" + YAML.stringify(frontmatter) + "---\n"

writeFileSync(`${postsPath}/${lang}/${fileName}`, res)

console.log(`Created ${postsPath}/${lang}/${fileName}`)
