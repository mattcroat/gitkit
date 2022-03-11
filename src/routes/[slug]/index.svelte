<script lang="ts">
	import type { FrontMatterType } from '$root/types'

	export let content: string
	export let frontmatter: FrontMatterType
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
</svelte:head>

{@html content}
