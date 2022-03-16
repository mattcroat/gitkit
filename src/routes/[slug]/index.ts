import type { RequestHandler } from '@sveltejs/kit'

import { getPost } from '$root/lib/posts'

export const get: RequestHandler = async ({ params }) => {
	const { content, frontmatter } = await getPost(params.slug)

	return {
		headers: {
			'Cache-Control': `max-age=60, s-maxage=60`
		},
		body: { content, frontmatter }
	}
}
