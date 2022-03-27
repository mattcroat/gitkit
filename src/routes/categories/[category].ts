import type { RequestHandler } from '@sveltejs/kit'

import { getPostsByCategory } from '$root/lib/posts'
import { categories } from '$root/lib/config'

export const get: RequestHandler = async ({ params }) => {
	if (!categories.includes(params.category)) {
		throw new Error(`"${params.category}" doesn't exist. 💩`)
	}

	return {
		status: 200,
		headers: {
			'Cache-Control': `max-age=3600, s-maxage=60`
		},
		body: { posts: await getPostsByCategory(params.category) }
	}
}
