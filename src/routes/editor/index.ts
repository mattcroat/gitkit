import type { RequestHandler } from '@sveltejs/kit'

import { getPosts, removePost } from '$root/lib/posts'

export const get: RequestHandler = async () => {
	const posts = await getPosts()

	return {
		body: { posts }
	}
}

export const del: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = String(form.get('slug'))

	await removePost(slug)

	return {
		status: 303,
		headers: { location: '/editor' }
	}
}
