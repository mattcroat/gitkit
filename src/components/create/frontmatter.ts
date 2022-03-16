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
	title: Title
	description: Description
	slug: 'slug-url'
	published: '${date}'
	category: 'category'
	image: 'social-image.webp'
	---
`
	.trim()
	.replace(/\t/g, '')

export default frontmatter
