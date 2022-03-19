import type { RequestHandler } from '@sveltejs/kit'
import { markdownToHTML } from '$root/lib/markdown'

let content = ''

export const get: RequestHandler = async () => {
	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: { content }
	}
}

export const post: RequestHandler = async ({ request }) => {
	const data = await request.json()
	content = await markdownToHTML(data)

	return {}
}
