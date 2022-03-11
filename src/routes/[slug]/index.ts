import type { RequestHandler } from '@sveltejs/kit'

import { getPost } from '$root/lib/posts'

export const get: RequestHandler = async ({ params }) => {
	const { content, frontmatter } = await getPost(params.slug)

	return {
		body: { content, frontmatter }
	}
}
