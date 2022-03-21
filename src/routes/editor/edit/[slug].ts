import type { RequestHandler } from '@sveltejs/kit'

import { editPost, getPost } from '$root/lib/posts'

export const get: RequestHandler = async ({ params, url }) => {
	const draft = url.searchParams.has('draft')
	const { frontmatter, postMarkdown } = await getPost(params.slug, { draft })

	return {
		body: {
			slug: params.slug,
			title: frontmatter.title,
			markdown: postMarkdown
		}
	}
}

export const post: RequestHandler = async ({ params, request }) => {
	const form = await request.formData()
	const markdown = String(form.get('markdown'))

	await editPost(params.slug, markdown)

	return {
		status: 303,
		headers: {
			location: '/editor'
		}
	}
}
