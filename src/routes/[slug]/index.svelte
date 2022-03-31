<script lang="ts">
	import { siteName, siteUrl, twitterHandle } from '$root/lib/config'
	import type { FrontMatterType } from '$root/types'

	export let content: string
	export let frontmatter: FrontMatterType
</script>

<svelte:head>
	<title>{frontmatter.title}</title>

	<meta content={frontmatter.description} name="description" />

	<meta content={frontmatter.title} property="og:title" />
	<meta content={frontmatter.image} property="og:image" />
	<meta content={siteUrl} property="og:url" />
	<meta content={frontmatter.description} property="og:description" />
	<meta content={siteName} property="og:site_name" />

	<meta content={twitterHandle} name="twitter:creator" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content={frontmatter.title} name="twitter:title" />
	<meta content={frontmatter.description} name="twitter:description" />
	<meta content={frontmatter.image} name="twitter:image" />
</svelte:head>

<main>
	<div class="prose">
		{@html content}
	</div>
</main>

<style>
	.prose {
		display: grid;
		grid-template-columns:
			1fr [gutter-start] 100px [content-start] var(--post-reading-length)
			[content-end] 100px [gutter-end] 1fr;
		row-gap: 2rem;
		font-size: var(--post-font-size);
	}

	.prose > :global(*) {
		grid-column: content-start / content-end;
	}

	.prose :global(img),
	.prose :global(.rehype-code-title),
	.prose :global(pre) {
		grid-column: gutter-start / gutter-end;
	}
</style>
