import type { RequestHandler } from '@sveltejs/kit'

import { postsUrl } from '$root/lib/config'

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = form.get('slug')
	const content = String(form.get('content'))

	if (!slug) {
		throw new Error(`You have to specify a slug. 🐌`)
	}

	// check if post already exists
	const post = await fetch(`${postsUrl}/${slug}.md`, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${process.env.GH_TOKEN}`
		}
	})

	if (post.status === 200) {
		throw new Error(`Post with a slug of "${slug}" already exists. 🤷`)
	}

	const createPost = await fetch(`${postsUrl}/${slug}.md`, {
		method: 'PUT',
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${process.env.GH_TOKEN}`
		},
		body: JSON.stringify({
			message: 'bot: Added post 🤖',
			// Base64 encoding is required
			content: Buffer.from(content).toString('base64')
		})
	})

	if (createPost.status !== 201) {
		throw new Error(`Something went wrong creating the post.`)
	}

	return {
		status: 303,
		headers: {
			location: '/editor'
		}
	}
}
