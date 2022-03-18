import { unified } from 'unified'
import parseMarkdown from 'remark-parse'
import serializeMarkdown from 'remark-stringify'
import markdownToHtml from 'remark-rehype'
import markdownToHtmlAgain from 'rehype-raw'
import serializeHtml from 'rehype-stringify'
import matter from 'gray-matter'

// plugins
import shikiTwoslash from 'remark-shiki-twoslash'
import remarkGfm from 'remark-gfm'
import remarkHeadings from 'remark-autolink-headings'
import remarkSlug from 'remark-slug'
import remarkSmartypants from 'remark-smartypants'
import remarkTableofContents from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import type { FrontMatterType } from '$root/types'

export async function markdownToHTML(markdown: string) {
	const { content, data } = matter(markdown)

	// I could use `compile` from mdsvex to get
	// Svelte components working inside Markdown
	const result = await unified()
		.use(parseMarkdown)
		.use(serializeMarkdown)
		.use([
			// Syntax highlight
			[shikiTwoslash, { theme: 'dark-plus' }],
			// GitHub flavored Markdown
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
		.use(markdownToHtml, { allowDangerousHtml: true })
		// At this point there's a mix of Markdown and HTML
		// so `rehype-raw` is required to process it into an AST
		// if you want to do further processing
		.use(markdownToHtmlAgain)
		.use(serializeHtml)
		.process(content)
	const processedMarkdown = result.value

	return {
		content: processedMarkdown as string,
		frontmatter: data as FrontMatterType
	}
}
