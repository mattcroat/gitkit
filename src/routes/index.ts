import type { RequestHandler } from '@sveltejs/kit'

import { getPosts } from '$root/lib/posts'

export const get: RequestHandler = async () => {
	const posts = await getPosts()

	return {
		headers: {
			'Cache-Control': `max-age=3600, s-maxage=60`
		},
		body: { posts }
	}
}
