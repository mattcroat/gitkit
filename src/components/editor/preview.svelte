<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import snarkdown from 'snarkdown'

	const markdown: Writable<string> = getContext('markdown')
	$: preview = $markdown.replace(/^---[\s\S]*---$/gm, '')
</script>

<section class="prose">
	{@html snarkdown(preview)}
</section>

<style>
	.prose {
		padding: 1rem 2rem;
		background-color: hsl(220 20% 10%);
		word-break: break-word;
		overflow: auto;
	}
</style>
