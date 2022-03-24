import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import path from 'path'
import { Server } from 'socket.io'

// markdown parsing
import { unified } from 'unified'
import fromMarkdown from 'remark-parse'
import toMarkdown from 'remark-stringify'
import fromMarkdownToHtml from 'remark-rehype'
import toHtml from 'rehype-stringify'
import matter from 'gray-matter'

// markdown plugins
import remarkGfm from 'remark-gfm'
import remarkHeadings from 'remark-autolink-headings'
import remarkSlug from 'remark-slug'
import remarkSmartypants from 'remark-smartypants'
import remarkTableofContents from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypePrism from 'rehype-prism-plus'
import rehypeCodeTitles from 'rehype-code-titles'

async function markdownToHTML(markdown) {
	const { content } = matter(markdown)

	try {
		const result = await unified()
			.use(fromMarkdown)
			.use([
				remarkGfm,
				remarkHeadings,
				remarkSlug,
				remarkSmartypants,
				[remarkTableofContents, { tight: true }],
				remarkUnwrapImages
			])
			.use(toMarkdown)
			.use(fromMarkdownToHtml)
			.use(rehypeCodeTitles)
			.use(rehypePrism)
			.use(toHtml)
			.process(content)
		const processedMarkdown = result.value
		return processedMarkdown
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
			return
		}
	}
}

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		const io = new Server(server.httpServer)

		io.on('connection', (socket) => {
			// receive a message from the client
			socket.on('updatePreview', async (markdown) => {
				const html = await markdownToHTML(markdown)
				// send message to the client
				socket.emit('previewUpdate', html)
			})
		})
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$root: path.resolve('./src')
				}
			},
			plugins: [webSocketServer]
		},
		methodOverride: { allowed: ['DELETE'] }
	}
}

export default config
