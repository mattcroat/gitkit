import { unified } from 'unified'
import remarkShikiTwoslash from 'remark-shiki-twoslash'
import parseMarkdown from 'remark-parse'
import markdownToHtml from 'remark-rehype'
import serializeHtml from 'rehype-stringify'
import matter from 'gray-matter'

// plugins
import remarkGfm from 'remark-gfm'
import remarkHeadings from 'remark-autolink-headings'
import remarkSlug from 'remark-slug'
import remarkSmartypants from 'remark-smartypants'
import remarkTableofContents from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import type { FrontMatterType } from '$root/types'

export async function markdownToHTML(markdown: string) {
	const { content, data } = matter(markdown)

	// if I wanted I could use `compile` from mdsvex to get
	// Svelte components working inside markdown

	const result = await unified()
		.use(parseMarkdown)
		.use([
			// Syntax highlight
			[remarkShikiTwoslash, { theme: 'dark-plus' }],
			// GitHub flavored markdown
			remarkGfm,
			// Unique identifier for headings
			remarkHeadings,
			// Links for headings
			remarkSlug,
			// Typographic punctuation like real quotes
			remarkSmartypants,
			// Generates table of contents from headings
			// `tight` removes <p> from <li> when nested
			[remarkTableofContents, { tight: true }],
			// Remove paragraph around images
			remarkUnwrapImages
		])
		.use(markdownToHtml)
		.use(serializeHtml)
		.process(content)
	const processedMarkdown = result.value

	return {
		content: processedMarkdown as string,
		frontmatter: data as FrontMatterType
	}
}
