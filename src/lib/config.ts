export const siteName = 'GitKit'
export const siteUrl = 'http://localhost:3000/'

export const api = 'https://api.github.com'
export const owner = 'mattcroat'
export const repo = 'gitkit'
export const path = 'posts'
export const mainBranch = 'main'

// https://api.github.com/repos/mattcroat/gitkit/contents/data/posts.json
export const postsDataUrl = `${api}/repos/${owner}/${repo}/contents/data/posts.json`

// https://api.github.com/repos/mattcroat/gitkit/contents/posts
export const postsUrl = `${api}/repos/${owner}/${repo}/contents/${path}`

// https://github.com/mattcroat/gitkit/blob/main/posts
export const fileUrl = `https://github.com/${owner}/${repo}/blob/main/posts`
