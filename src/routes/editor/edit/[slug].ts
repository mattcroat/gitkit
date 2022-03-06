import type { RequestHandler } from '@sveltejs/kit'

import { postsUrl } from '$root/lib/config'

export const get: RequestHandler = async ({ params }) => {
	const postUrl = `${postsUrl}/${params.slug}.md`

	const response = await fetch(postUrl, {
		headers: {
			// https://docs.github.com/en/rest/overview/media-types
			Accept: 'application/vnd.github.v3.raw',
			Authorization: `token ${process.env.GH_TOKEN}`
		}
	})

	if (!response.ok) {
		throw new Error(`Could not fetch ${params.slug}`)
	}

	return {
		body: {
			slug: params.slug,
			content: await response.text()
		}
	}
}

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = form.get('slug')
	const content = String(form.get('content'))

	if (!slug || !content) {
		throw new Error(`You have to specify the slug and content. 🤷`)
	}

	const post = await fetch(`${postsUrl}/${slug}.md`, {
		headers: {
			// GitHub suggests to include the API version
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${process.env.GH_TOKEN}`
		}
	})

	if (post.status !== 200) {
		throw new Error(`Could not find ${slug}. 🤷`)
	}

	const updatePost = await fetch(`${postsUrl}/${slug}.md`, {
		method: 'PUT',
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${process.env.GH_TOKEN}`
		},
		body: JSON.stringify({
			message: 'bot: Updated post 🤖',
			// Base64 encoding is required
			content: Buffer.from(content).toString('base64'),
			sha: (await post.json()).sha
		})
	})

	if (updatePost.status !== 200) {
		throw new Error(`Something went wrong updating the post.`)
	}

	return {
		status: 303,
		headers: {
			location: '/editor'
		}
	}
}
