import type { RequestHandler } from '@sveltejs/kit'

import { postsUrl } from '$root/lib/config'
import type { GitHubAPIResponseType } from '$root/types'

export const get: RequestHandler = async () => {
	const response = await fetch(postsUrl, {
		headers: {
			// GitHub suggests to include the API version
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${process.env.GH_TOKEN}`
		}
	})

	if (!response.ok) {
		throw new Error('Could not fetch posts. 💩')
	}

	const posts: GitHubAPIResponseType[] = await response.json()
	const slugs = posts.map((post) => post.name.replace('.md', ''))

	return {
		body: { posts: slugs }
	}
}

export const del: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const slug = form.get('slug')

	if (!slug) {
		throw new Error('Invalid slug. 🐌')
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

	const removePost = await fetch(`${postsUrl}/${slug}.md`, {
		method: 'DELETE',
		headers: {
			// GitHub suggests to include the API version
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${process.env.GH_TOKEN}`
		},
		body: JSON.stringify({
			message: 'bot: Post removed 🤖',
			sha: (await post.json()).sha
		})
	})

	if (removePost.status !== 200) {
		throw new Error('Something went wrong removing the post.')
	}

	return {
		status: 303,
		headers: { location: '/editor' }
	}
}
