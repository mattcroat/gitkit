<script lang="ts">
	import { getContext } from 'svelte'
	import { marked } from 'marked'
	import type { EditorPostType } from '$root/types'

	const post: EditorPostType = getContext('post')
	$: preview = $post.markdown.replace(/^---[\s\S]*---$/gm, '')
</script>

<section class="preview">
	<div class="prose">
		{@html marked(preview)}
	</div>
</section>

<style>
	.preview {
		padding: 1rem 2rem;
		background-color: hsl(0 0% 12%);
		overflow: auto;
		scrollbar-width: thin;
	}

	.preview::-webkit-scrollbar {
		width: 2px;
		background-color: transparent;
	}

	.preview:hover::-webkit-scrollbar-thumb {
		background-color: hsl(0, 0%, 60%);
	}

	.prose {
		max-width: 60ch;
		display: grid;
		gap: 2rem;
	}

	.prose :global(h2) {
		margin: 2rem 0;
	}

	.prose :global(h2) {
		margin: 2rem 0;
	}

	.prose :global(li) {
		list-style-position: inside;
	}

	.prose :global(pre) {
		padding: 1rem;
		margin: 2rem 0;
		background-color: hsl(0 0% 20%);
	}
</style>
