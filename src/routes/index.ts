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

	// etag
	// console.log(response.headers.get('etag'))

	return {
		body: { slugs }
	}
}
