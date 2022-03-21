import type { RequestHandler } from '@sveltejs/kit'

import { createPost } from '$root/lib/posts'

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = String(form.get('slug'))
	const markdown = String(form.get('markdown'))

	await createPost(slug, markdown, { draft: true })

	return {
		status: 303,
		headers: { location: '/editor' }
	}
}
