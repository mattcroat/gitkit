import type { RequestHandler } from '@sveltejs/kit'

import { editPost, getPost } from '$root/lib/posts'

export const get: RequestHandler = async ({ params }) => {
	const { postMarkdown } = await getPost(params.slug)

	return {
		body: {
			markdown: postMarkdown
		}
	}
}

export const post: RequestHandler = async ({ params, request }) => {
	const form = await request.formData()
	const content = String(form.get('content'))

	await editPost(params.slug, content)

	return {
		status: 303,
		headers: {
			location: '/editor'
		}
	}
}
