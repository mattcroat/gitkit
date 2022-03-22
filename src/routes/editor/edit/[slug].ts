import type { RequestHandler } from '@sveltejs/kit'

import { createPost, editPost, getPost } from '$root/lib/posts'

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

export const post: RequestHandler = async ({ params, request, url }) => {
	const form = await request.formData()
	const markdown = String(form.get('markdown'))
	const save = form.has('save')
	const publish = form.has('publish')
	const draft = url.searchParams.has('draft')

	const action = {
		save: save && !draft,
		saveDraft: save && draft,
		publishDraft: draft && publish
	}

	if (action.save) {
		await editPost(params.slug, markdown)
	}

	if (action.saveDraft) {
		await editPost(params.slug, markdown, { draft: true })
	}

	if (action.publishDraft) {
		await createPost(params.slug, markdown)
	}

	return {
		status: 303,
		headers: { location: '/editor' }
	}
}
