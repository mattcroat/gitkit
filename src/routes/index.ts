import type { RequestHandler } from '@sveltejs/kit'

import { getPosts } from '$root/lib/posts'

export const get: RequestHandler = async () => {
	const slugs = await getPosts()

	return {
		body: { slugs }
	}
}
