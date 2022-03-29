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

<div class="prose">
	{@html content}
</div>
