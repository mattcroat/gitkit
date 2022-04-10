import { markdownToHTML, frontMatter } from './markdown'
import { mainBranch, postsDataUrl, postsUrl } from './config'
import type {
	FrontMatterType,
	GetSHAType,
	GitHubAPIResponseType,
	PostItemType,
	PostType,
	RateAPIResponseType
} from '$root/types'

const headers = {
	// GitHub suggests to include the API version
	Accept: 'application/vnd.github.v3+json',
	Authorization: `token ${process.env.GH_TOKEN}`
}

export async function getRateLimit(): Promise<RateAPIResponseType> {
	const response = await fetch('https://api.github.com/rate_limit', { headers })
	const { resources } = await response.json()
	const { limit, used, remaining, reset } = resources.core

	const currentTime = new Date()
	const resetTime = new Date(reset * 1000)

	const remainingMinutes = +(
		(resetTime.getTime() - currentTime.getTime()) /
		1000 /
		60
	).toFixed()

	const resetTimeLocale = resetTime.toLocaleTimeString('en', {
		hour: '2-digit',
		minute: '2-digit'
	})

	return {
		limit,
		used,
		remaining,
		remainingMinutes,
		reset,
		resetTimeLocale
	}
}

async function getSHA({ slug, type }: GetSHAType): Promise<string> {
	const postUrl = `${postsUrl}/${slug}/${slug}.md`
	const url = type === 'post' ? postUrl : postsDataUrl

	const response = await fetch(url, { headers })

	if (response.status !== 200) {
		throw new Error(`🤷 Could not find SHA for ${url}`)
	}

	return (await response.json()).sha
}

async function getFrontMatter(slug: string): Promise<FrontMatterType> {
	const postUrl = `${postsUrl}/${slug}/${slug}.md`

	const response = await fetch(postUrl, {
		headers: {
			...headers,
			// https://docs.github.com/en/rest/overview/media-types
			Accept: 'application/vnd.github.v3.raw'
		}
	})

	if (!response.ok) {
		throw new Error(`💩 Could not fetch ${postUrl}`)
	}

	const postMarkdown = await response.text()
	const postFrontmatter = await frontMatter(postMarkdown)

	return postFrontmatter
}

export async function updatePosts(): Promise<void> {
	const response = await fetch(postsUrl, { headers })

	if (!response.ok) {
		throw new Error('💩 Could not fetch posts!')
	}

	const postsData: GitHubAPIResponseType[] = await response.json()
	const slugs = postsData.map((post) => post.name)

	let posts = []
	for (const slug of slugs) {
		posts = [...posts, await getFrontMatter(slug)]
	}
	const serializedPosts = JSON.stringify(posts, null, 2)

	const updatePosts = await fetch(postsDataUrl, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			message: `api: ✍️ Update posts`,
			// Base64 encoding is required
			content: Buffer.from(serializedPosts).toString('base64'),
			sha: await getSHA({ type: 'posts' }),
			branch: mainBranch
		})
	})

	if (updatePosts.status !== 200) {
		throw new Error(`💩 Something went wrong updating posts`)
	}
}

export async function getPosts(): Promise<PostItemType[]> {
	const response = await fetch(postsUrl, { headers })

	if (!response.ok) {
		throw new Error('💩 Could not fetch posts!')
	}

	const postsData: GitHubAPIResponseType[] = await response.json()
	const slugs = postsData.map((post) => post.name)

	let posts = []
	for (const postSlug of slugs) {
		const { slug, title } = await getFrontMatter(postSlug)
		posts = [...posts, { slug, title }]
	}

	// etag
	// console.log(response.headers.get('etag'))

	return posts
}

export async function getPostsByCategory(
	category: string
): Promise<PostItemType[]> {
	const response = await fetch(postsUrl, { headers })

	if (!response.ok) {
		throw new Error('💩 Could not fetch posts!')
	}

	const postsData: GitHubAPIResponseType[] = await response.json()
	const slugs = postsData.map((post) => post.name.replace('.md', ''))

	let posts = []
	for (const postSlug of slugs) {
		const frontMatter = await getFrontMatter(postSlug)
		if (frontMatter.category === category) {
			posts = [
				...posts,
				{
					slug: frontMatter.slug,
					title: frontMatter.title
				}
			]
		}
	}

	return posts
}

export async function getPost(slug: string): Promise<PostType> {
	const postUrl = `${postsUrl}/${slug}/${slug}.md`

	const response = await fetch(postUrl, {
		headers: {
			...headers,
			// https://docs.github.com/en/rest/overview/media-types
			Accept: 'application/vnd.github.v3.raw'
		}
	})

	if (!response.ok) {
		throw new Error(`💩 Could not fetch ${postUrl}`)
	}

	const postMarkdown = await response.text()
	const { content, frontmatter } = await markdownToHTML(postMarkdown)

	return { content, frontmatter, postMarkdown }
}

export async function createPost(slug: string, content: string): Promise<void> {
	if (!slug) {
		throw new Error(`🐌 You have to specify a slug`)
	}

	// check if post already exists
	const post = await fetch(`${postsUrl}/${slug}/${slug}.md`, { headers })
	if (post.status === 200) {
		throw new Error(`👻 The post already exists`)
	}

	const createPost = await fetch(`${postsUrl}/${slug}/${slug}.md`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			message: `api: 🔥 Add ${slug}.md`,
			// Base64 encoding is required
			content: Buffer.from(content).toString('base64'),
			branch: mainBranch
		})
	})

	if (createPost.status !== 201) {
		throw new Error(
			`💩 Something went wrong creating ${postsUrl}/${slug}/${slug}.md`
		)
	}
}

export async function removePost(slug: string): Promise<void> {
	if (!slug) {
		throw new Error('🐌 Invalid slug')
	}

	const removePost = await fetch(`${postsUrl}/${slug}/${slug}.md`, {
		method: 'DELETE',
		headers,
		body: JSON.stringify({
			message: `api: 💩 Remove ${slug}.md`,
			sha: await getSHA({ slug, type: 'post' }),
			branch: mainBranch
		})
	})

	if (removePost.status !== 200) {
		throw new Error(
			`💩 Something went wrong removing "${postsUrl}/${slug}/${slug}.md"`
		)
	}
}

export async function editPost(slug: string, content: string): Promise<void> {
	if (!slug || !content) {
		throw new Error(`🤷 You have to specify the slug and content`)
	}

	const updatePost = await fetch(`${postsUrl}/${slug}/${slug}.md`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			message: `api: ✍️ Update ${slug}.md`,
			// Base64 encoding is required
			content: Buffer.from(content).toString('base64'),
			sha: await getSHA({ slug, type: 'post' }),
			branch: mainBranch
		})
	})

	if (updatePost.status !== 200) {
		throw new Error(
			`💩 Something went wrong updating ${postsUrl}/${slug}/${slug}.md`
		)
	}
}
