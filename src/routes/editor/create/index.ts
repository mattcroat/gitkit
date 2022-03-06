import type { RequestHandler } from '@sveltejs/kit'

import { createPost } from '$root/lib/posts'

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = String(form.get('slug'))
	const content = String(form.get('content'))

	await createPost(slug, content)

	return {
		status: 303,
		headers: { location: '/editor' }
	}
}
