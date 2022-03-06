import type { RequestHandler } from '@sveltejs/kit'

import { editPost, getPost } from '$root/lib/posts'

export const get: RequestHandler = async ({ params }) => {
	const content = await getPost(params.slug)

	return {
		body: {
			slug: params.slug,
			content
		}
	}
}

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = String(form.get('slug'))
	const content = String(form.get('content'))

	await editPost(slug, content)

	return {
		status: 303,
		headers: {
			location: '/editor'
		}
	}
}
