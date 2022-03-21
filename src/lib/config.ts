export const api = 'https://api.github.com'
export const owner = 'mattcroat'
export const repo = 'gitkit'
export const path = 'posts'

// https://api.github.com/repos/mattcroat/gitkit/contents/posts/post.md
export const postsUrl = `${api}/repos/${owner}/${repo}/contents/${path}`

// https://github.com/mattcroat/gitkit/blob/main/posts/post.md
export const fileUrl = `https://github.com/${owner}/${repo}/blob/main/posts`
export const draftFileUrl = `https://github.com/${owner}/${repo}/blob/draft/posts`
