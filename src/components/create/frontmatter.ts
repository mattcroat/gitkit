function getDate() {
	const [month, day, year] = new Date()
		.toLocaleString('en', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		})
		.split('/')

	return `${year}-${month}-${day}`
}

const date = getDate()

const frontmatter = `
	---
	title: 'Untitled'
	description: 'Description'
	slug: 'slug'
	published: '${date}'
	category: 'category'
	image: 'social-image.webp'
	type: 'series'
	draft: 'true'
	---
`
	.trim()
	.replace(/\t/g, '')

export default frontmatter
