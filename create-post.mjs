import YAML from 'yaml'
import { writeFileSync } from 'fs'

if (process.argv.length < 3) {
    console.error("Path of the post is required")
    process.exit(1)
}

const frontmatter = {
    title: '',
    date: new Date().toISOString(),
    tags: [],
    summary: "",
    keywords: [],
}

const res = "---\n" + YAML.stringify(frontmatter) + "---\n"

writeFileSync(process.argv[2], res)

console.log(`Created ${process.argv[2]}`)
