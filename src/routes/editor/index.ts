import type { RequestHandler } from '@sveltejs/kit'

import { getAllPosts, removePost } from '$root/lib/posts'

export const get: RequestHandler = async () => {
	const { drafts, published } = await getAllPosts()

	return {
		status: 200,
		headers: {
			'Cache-Control': `max-age=3600, s-maxage=60`
		},
		body: { drafts, published }
	}
}

export const del: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = String(form.get('slug'))
	const draft = form.has('draft')

	draft ? await removePost(slug, { draft: true }) : await removePost(slug)

	return {
		status: 303,
		headers: { location: '/editor' }
	}
}
