import type { Writable } from 'svelte/store'

export type GitHubAPIResponseType = {
	name: string
	path: string
	sha: string
	size: number
	url: string
	html_url: string
	git_url: string
	download_url: string
	type: string
	_links: {
		self: string
		git: string
		html: string
	}
}

export type RateAPIResponseType = {
	limit: number
	used: number
	remaining: number
	reset: number
}

export type PostItemType = {
	title: string
	slug: string
}

export type FrontMatterType = {
	title: string
	description: string
	slug: string
	published: string
}

export type PostType = {
	content: string
	frontmatter: FrontMatterType
	postMarkdown: string
}

export type EditorPostType = Writable<{
	title: string
	markdown: string
	preview: boolean
}>
