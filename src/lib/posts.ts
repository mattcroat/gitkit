import { markdownToHTML, frontMatter } from './markdown'
import { postsUrl } from './config'
import type {
	FrontMatterType,
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
	return resources.core
}

async function getPostSHA(slug: string): Promise<string> {
	const response = await fetch(`${postsUrl}/${slug}.md`, { headers })

	if (response.status !== 200) {
		throw new Error(`Could not find ${slug}. 🤷`)
	}

	return (await response.json()).sha
}

async function getFrontMatter(
	slug: string,
	{ draft }: { draft?: boolean } = {}
): Promise<FrontMatterType> {
	const params = draft ? '?ref=draft' : ''
	const postUrl = `${postsUrl}/${slug}.md${params}`

	const response = await fetch(postUrl, {
		headers: {
			...headers,
			// https://docs.github.com/en/rest/overview/media-types
			Accept: 'application/vnd.github.v3.raw'
		}
	})

	if (!response.ok) {
		throw new Error(`Could not fetch ${slug}`)
	}

	const postMarkdown = await response.text()
	const postFrontmatter = await frontMatter(postMarkdown)

	return postFrontmatter
}

export async function getPosts(): Promise<PostItemType[]> {
	const response = await fetch(postsUrl, { headers })

	if (!response.ok) {
		throw new Error('Could not fetch posts. 💩')
	}

	const postsData: GitHubAPIResponseType[] = await response.json()
	const slugs = postsData.map((post) => post.name.replace('.md', ''))

	let posts = []
	for (const postSlug of slugs) {
		const { slug, title } = await getFrontMatter(postSlug)
		posts = [...posts, { slug, title }]
	}

	// etag
	// console.log(response.headers.get('etag'))

	return posts
}

export async function getDrafts(): Promise<PostItemType[]> {
	const response = await fetch(`${postsUrl}?ref=draft`, { headers })

	if (!response.ok) {
		throw new Error('Could not fetch posts. 💩')
	}

	const postsData: GitHubAPIResponseType[] = await response.json()
	const slugs = postsData.map((post) => post.name.replace('.md', ''))

	let posts = []
	for (const postSlug of slugs) {
		const { slug, title } = await getFrontMatter(postSlug, { draft: true })
		posts = [...posts, { slug, title }]
	}

	return posts
}

export async function getAllPosts(): Promise<{
	published: PostItemType[]
	drafts: PostItemType[]
}> {
	const [published, drafts] = await Promise.all([getPosts(), getDrafts()])
	return { published, drafts }
}

export async function getPost(slug: string): Promise<PostType> {
	const postUrl = `${postsUrl}/${slug}.md`

	const response = await fetch(postUrl, {
		headers: {
			...headers,
			// https://docs.github.com/en/rest/overview/media-types
			Accept: 'application/vnd.github.v3.raw'
		}
	})

	if (!response.ok) {
		throw new Error(`Could not fetch ${slug}`)
	}

	const postMarkdown = await response.text()
	const { content, frontmatter } = await markdownToHTML(postMarkdown)

	return { content, frontmatter, postMarkdown }
}

export async function createPost(
	slug: string,
	content: string,
	{ draft }: { draft?: boolean } = {}
): Promise<void> {
	if (!slug) {
		throw new Error(`You have to specify a slug. 🐌`)
	}

	const params = draft ? '?ref=draft' : ''
	const branch = draft ? 'draft' : 'main'

	// check if post already exists
	const post = await fetch(`${postsUrl}/${slug}.md${params}`, { headers })

	if (post.status === 200) {
		throw new Error(`${slug} already exists. 🤷`)
	}

	const createPost = await fetch(`${postsUrl}/${slug}.md`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			message: 'bot: Add post 🤖',
			// Base64 encoding is required
			content: Buffer.from(content).toString('base64'),
			branch
		})
	})

	if (createPost.status !== 201) {
		throw new Error(`Something went wrong creating ${slug}`)
	}
}

export async function removePost(slug: string): Promise<void> {
	if (!slug) {
		throw new Error('Invalid slug. 🐌')
	}

	const removePost = await fetch(`${postsUrl}/${slug}.md`, {
		method: 'DELETE',
		headers,
		body: JSON.stringify({
			message: 'bot: Remove post 🤖',
			sha: await getPostSHA(slug)
		})
	})

	if (removePost.status !== 200) {
		throw new Error('Something went wrong removing the post.')
	}
}

export async function editPost(slug: string, content: string): Promise<void> {
	if (!slug || !content) {
		throw new Error(`You have to specify the slug and content. 🤷`)
	}

	const updatePost = await fetch(`${postsUrl}/${slug}.md`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			message: 'bot: Update post 🤖',
			// Base64 encoding is required
			content: Buffer.from(content).toString('base64'),
			sha: await getPostSHA(slug)
		})
	})

	if (updatePost.status !== 200) {
		throw new Error(`Something went wrong updating the post.`)
	}
}
