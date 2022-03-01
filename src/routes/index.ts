import type { RequestHandler } from '@sveltejs/kit'

import { postsUrl } from '$root/lib/config'

export const get: RequestHandler = async () => {
	const response = await fetch(postsUrl, {
		headers: {
			// GitHub suggests to include the API version
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${process.env.GH_TOKEN}`
		}
	})
	const posts = await response.json()
	const slugs = posts.map((post) => post.name.replace('.md', ''))

	// etag
	// console.log(response.headers.get('etag'))

	return {
		body: { slugs }
	}
}
