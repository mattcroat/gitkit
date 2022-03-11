import { unified } from 'unified'
import remarkParse from 'remark-parse/lib'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import matter from 'gray-matter'

import type { FrontMatterType } from '$root/types'

export async function markdownToHTML(markdown: string) {
	const { content, data } = matter(markdown)

	// if I wanted I could use `compile` from mdsvex to get
	// Svelte components working inside markdown

	const result = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(content)
	const processedMarkdown = result.value

	return {
		content: processedMarkdown as string,
		frontmatter: data as FrontMatterType
	}
}
