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

	// this should be turned into markdown
	const post = await response.text()

	return {
		body: { post }
	}
}
