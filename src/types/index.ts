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
