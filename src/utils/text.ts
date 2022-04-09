export function capitalize(text: string): string {
	return text
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.substring(1))
		.join(' ')
}
