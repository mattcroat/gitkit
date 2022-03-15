import type { RequestHandler } from '@sveltejs/kit'

import { editPost, getPost } from '$root/lib/posts'

export const get: RequestHandler = async ({ params }) => {
	const { frontmatter, postMarkdown } = await getPost(params.slug)

	return {
		body: {
			title: frontmatter.title,
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
